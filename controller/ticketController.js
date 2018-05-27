var exports = module.exports = {}
const Ticket = require('../model/ticket');
const User = require('../model/user');
const Alat = require('../model/alat');
const Assigment = require('../model/assigment');
const Comment = require('../model/comment');
const Notif = require('../model/notif');
const Rating = require('../model/rating');
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

exports.store = async(req, res) => {
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

	var save = await new Ticket(data).save();
	var notifData = {
		'ticket_code' : code,
		'notif_from' : req.user.id_users,
		'notif_too' : req.body.assigment,
		'type' : 1
	}
	var saveNotif = await new Notif(notifData).save();
	var ticketIO = await  Ticket.where({'ticket_code' : code}).fetchAll({withRelated : ['user', 'assigments']});
	console.log(ticketIO.toJSON())
	res.io.emit('new-ticket', {'user' : req.body.assigment, 'ticket' : ticketIO.toJSON()[0]});
	return res.redirect('http://'+req.headers.host+'/ticket');
}

exports.view = (req, res) => {
	async function main () {
		const ticket = await Ticket.where(req.params).fetchAll({withRelated : ['user', 'assigments']});
		if(ticket){
			const ticket_id = ticket.toJSON()[0].id_ticket;
			const resultComment = await Comment.where('ticket_id', ticket_id).orderBy('created', 'DESC').fetchAll({withRelated : ['user']});
			var rating = await Rating.where('ticket_id', ticket_id).fetch();
			if(rating){
				rate = rating.toJSON();
			} else{
				rate = null
			}
			return res.render('ticket/view', {
				ticket :ticket.toJSON()[0], 
				ticket_code : req.params.ticket_code,
				comment : resultComment.toJSON(),
				rating : rate
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
		sts = 2;
	}
	else if(req.body.status == 'complete'){
		sts = 1;
	}
	let status = await new Ticket(req.params).save({'status' : sts});
	if(status){
		var getTicket = await Ticket.where(req.params).fetch();
		var result = getTicket.toJSON()
		var code = result.ticket_code;
		var too = result.owner;
		var notifData = {
			'ticket_code' : code,
			'notif_from' : req.user.id_users,
			'notif_too' : too,
			'type' : 2
		}
		var saveNotif = await new Notif(notifData).save();
		res.io.emit('ticket-status', {'user' : too, 'name':req.user.name, 'ticket':code, 'status' : sts});
		return res.json({'status' : 'success', 'type' : sts});
	}
	return res.json({ status: 'failed' });
}

exports.completes = async(req, res)=>{
	var old = await Rating.where('ticket_id', req.body.ticket_id).fetch();
	let status = await new Ticket({'id_ticket': req.body.ticket_id}).save({'status' : 1});
	if(old){
		var update = await Rating.where({'ticket_id': req.body.ticket_id}).save(req.body, {method:'update', patch:true});
	} else{
		var rate = await new Rating(req.body).save();
	}
	var getTicket = await Ticket.where({'id_ticket': req.body.ticket_id}).fetch();
	var result = getTicket.toJSON()	
	var notifData = {
		'ticket_code' : result.ticket_code,
		'notif_from' : req.user.id_users,
		'notif_too' : result.assignment,
		'type' : 3
	}
	var saveNotif = await new Notif(notifData).save();
	res.io.emit('complete-ticket',  {'user' : result.assignment, 'name':req.user.name, 'ticket':result.ticket_code, 'status' : 1})
	return res.json({status:'success'});
}