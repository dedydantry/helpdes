var exports = module.exports = {}
const Ticket = require('../model/ticket');
const User = require('../model/user');
const Alat = require('../model/alat');
const Assigment = require('../model/assigment');
const Comment = require('../model/comment');
const Notif = require('../model/notif');
var async = require('async');
let fileUpload       = require('express-fileupload');


exports.index = async(req,res) => {

	let result;
	if(req.user.roles[0].role_name == 'member'){
		result = await Ticket.where({'owner':req.user.id_users})
							 .orderBy('id_ticket', 'DESC')
							 .fetchAll({withRelated: ['user']})
	} else {
		result = await Ticket.query(function(qb) {
								qb.orderBy('id_ticket', 'DESC');
							})
							.fetchAll({withRelated: ['user']})
	}
	res.render('ticket/index', {ticket:result.toJSON()})
}

exports.create = (req, res) => {
	var locals = {};
	async.parallel([
		function(callback){
		    User.query(function(qb){
		    	qb.join('user_role', {'users.id_users' : 'user_role.user_id'});
		    	qb.where('user_role.role_id', 2);
		    }).fetchAll()
		    .then(collection => {
		    	locals.owner = collection.toJSON();
		    	callback();
		    })
		},
	], function(err){
		if(err) return next(err);
   		 res.render('ticket/create', {owners : locals.owner});
	})
}

exports.store = (req, res) => {
	var lampiran = '';

	if (req.files.lampiran){
		lampiran = req.files.lampiran.name;
		lmp = req.files.lampiran;
		lmp.mv('./public/img/'+lampiran, function(err){
			if(err) return res.redirect('http://'+req.headers.host+'/ticket/create');
		})
	}

	let code = Date.now();
	var data = {
		'ticket_code' : code,
		'owner' : req.user.id_users,
		'assignment' : req.body.assigment,
		'title' : req.body.title,
		'description' : req.body.description,
		'priority' : req.body.priority,
		'due_on' : req.body.due_on,
		'lampiran' : lampiran
	}

	new Ticket(data).save()
		.then(function(status){
			var rep = status.toJSON();
			var notifData = {
				'ticket_code' : code,
				'notif_from' : req.user.id_users,
				'notif_too' : req.body.assigment,
				'type' : 1
			}
			new Notif(notifData).save()
			.then(function(datas){
				return res.redirect('http://'+req.headers.host+'/ticket');
			})
			.catch(function(err){
				console.log(err.stack);
			})
		})
		.catch(function(err){
			console.log(err.stack);
		})
}

exports.view = (req, res) => {
	async function main () {
		const ticket = await Ticket.where(req.params).fetchAll({withRelated : ['user', 'assigments']});
		if(ticket){
			const ticket_id = ticket.toJSON()[0].id_ticket;
			// const assigment = await Assigment.where('ticket_id', ticket_id).fetchAll({withRelated : ['user']});
			const resultComment = await Comment.where('ticket_id', ticket_id).orderBy('created', 'DESC').fetchAll({withRelated : ['user']});
			// await makePurchase(ticket, assigment, resultComment)
			console.log(ticket.toJSON()[0].assigments.name);
			return res.render('ticket/view', {
				ticket :ticket.toJSON()[0], 
				ticket_code : req.params.ticket_code,
				comment : resultComment.toJSON()
			})	
		}
	}
	main()
	.then()
	.catch(console.error)
}

exports.edit = async(req, res) => {
	const ticket = await Ticket.where(req.params).fetch({withRelated : ['user', 'assigments']});
	const user = await User.query(function(qb){
			qb.join('user_role', {'users.id_users' : 'user_role.user_id'});
			qb.where('user_role.role_id', 2);
		}).fetchAll()
	return res.render('ticket/edit', {
		ticket : ticket.toJSON(), 
		owners : user.toJSON(), 
		ticket_code : req.params.ticket_code, 
	});
}

exports.update = async(req, res) => {
	var lampiran = req.body.old_file;
	if (req.files.lampiran){
		lampiran = req.files.lampiran.name;
		lmp = req.files.lampiran;
		lmp.mv('./public/img/'+lampiran, function(err){
			if(err) return res.redirect('http://'+req.headers.host+'/ticket/edit/'+req.params.ticket_code);
		})
	}
	var data = {
		'assignment' : req.body.assigment,
		'title' : req.body.title,
		'description' : req.body.description,
		'priority' : req.body.priority,
		'due_on' : req.body.due_on,
		'lampiran' : lampiran
	}

	const update = await new Ticket(req.params).save(data,{method:'update', patch: true });
	if(update){
		return res.redirect('http://'+req.headers.host+'/ticket');
	}
	return res.json({ status: 'failed' });  
}

exports.delete = async(req, res)=>{
	let deletes = await new Ticket(req.params).destroy();
	if(deletes){
		let assigmentdelete = await new Assigment().where({'ticket_id' : req.params.id_ticket}).destroy();
		if(assigmentdelete){
			let comment = await new Comment().where({'ticket_id' : req.params.id_ticket}).destroy();
			if(comment){
				return res.json({ status: 'success' });
			}
		}
	}
	return res.json({ status: 'failed' });
}

exports.change = async(req, res) => {
	let sts;
	if(req.body.status == 'start'){
		sts = 1;
	}
	else if(req.body.status == 'complete'){
		sts = 2;
	}
	let status = await new Ticket(req.params).save({'status' : sts});
	if(status){
		return res.json({'status' : 'success'});
	}
	return res.json({ status: 'failed' });
}