var exports = module.exports = {}
const Ticket = require('../model/ticket');
const User = require('../model/user');
const Alat = require('../model/alat');
const Assigment = require('../model/assigment');
const Comment = require('../model/comment');
var async = require('async');
let fileUpload       = require('express-fileupload');


function saveAssigment(ticket, user){
	for(var i = 0; i<user.length; i++){
		new Assigment({ticket_id : ticket, user_id:user[i]}).save()
		.then(model => {
			console.log(model)
		})
		.catch(err => {
			console.log(err.stack)
		})
	}
	return true;
}

exports.index = async(req,res) => {

	let result;
	if(req.user.roles[0].role_name == 'member'){
		result = await Ticket.where({'owner':req.user.id_users}).fetchAll({withRelated: ['user']})
	} else {
		result = await Ticket.fetchAll({withRelated: ['user']})
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

	if (req.files){
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
		'title' : req.body.title,
		'description' : req.body.description,
		'priority' : req.body.priority,
		'due_on' : req.body.due_on,
		'lampiran' : lampiran
	}

	new Ticket(data).save()
		.then(function(status){
			var rep = status.toJSON();
			if(saveAssigment(rep.id_ticket, req.body.assigment)){
				return res.redirect('http://'+req.headers.host+'/ticket');
			}
		})
		.catch(function(err){
			console.log(err.stack);
		})
}

exports.view = (req, res) => {
	async function main () {
		const ticket = await Ticket.where(req.params).fetchAll({withRelated : ['user']});
		if(ticket){
			const ticket_id = ticket.toJSON()[0].id_ticket;
			const assigment = await Assigment.where('ticket_id', ticket_id).fetchAll({withRelated : ['user']});
			const resultComment = await Comment.where('ticket_id', ticket_id).orderBy('created', 'DESC').fetchAll({withRelated : ['user']});
			// await makePurchase(ticket, assigment, resultComment)
			return res.render('ticket/view', {
				ticket :ticket.toJSON()[0], 
				assigment : assigment.toJSON(), 
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
	const ticket = await Ticket.where(req.params).fetch({withRelated : ['user']});
	const ticket_id = ticket.toJSON().id_ticket;
	const getAssigment = await Assigment.where('ticket_id', ticket_id).fetchAll();
	const user = await User.query(function(qb){
			qb.join('user_role', {'users.id_users' : 'user_role.user_id'});
			qb.where('user_role.role_id', 2);
		}).fetchAll()
	return res.render('ticket/edit', {
		ticket : ticket.toJSON(), 
		owners : user.toJSON(), 
		ticket_code : req.params.ticket_code, 
		assigment : getAssigment.toJSON()
	});
}

exports.update = async(req, res) => {
	var lampiran = '';
	return true;
	if (!req.files){
		lampiran = req.files.lampiran.name;
		
		lampiran.mv('./public/img/'+lampiran, function(err){
			if(err) return res.redirect('http://'+req.headers.host+'/ticket/edit/'+req.params.ticket_code);
		})
	}
	var data = {
		'title' : req.body.title,
		'description' : req.body.description,
		'priority' : req.body.priority,
		'due_on' : req.body.due_on,
		'lampiran' : lampiran
	}

	const update = await new Ticket(req.params).save(data,{method:'update', patch: true });
	let id_ticket = update.toJSON().id_ticket;
	console.log(id_ticket);
	if(update){
		let assigment = await new Assigment().where({'ticket_id' : id_ticket}).destroy();
		if(assigment){
			if(saveAssigment(id_ticket, req.body.assigment)){
				return res.redirect('http://'+req.headers.host+'/ticket');
			}
			return res.json({ status: 'failed' });  
		}
		else{
			return res.json({ status: 'failed' });  
		}
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