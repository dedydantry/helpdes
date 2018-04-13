var exports = module.exports = {}
const Ticket = require('../model/ticket');
const User = require('../model/user');
const Alat = require('../model/alat');
const Assigment = require('../model/assigment');
var async = require('async');

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

exports.index = (req,res) => {
    Ticket.fetchAll({withRelated: ['user']})
   .then(collection => 
   		res.render('ticket/index', {ticket:collection.toJSON()})
   	)
   .catch(err => console.log(err.stack));
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

		function (callback){
			Alat.fetchAll()
			.then(collection => {
				locals.alat = collection.toJSON();
		    	callback();
			})
		}
	], function(err){
		if(err) return next(err);
   		 res.render('ticket/create', {owners : locals.owner, alat : locals.alat});
	})
}

exports.store = (req, res) => {
	var lampiran = '';

	if (!req.files){
		lampiran = req.files.lampiran.name;
		
		lampiran.mv('./public/img/'+lampiran, function(err){
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
		'alat_id' : req.body.alat_id,
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
	var result = {};
	Ticket.where(req.params).fetchAll({withRelated: ['user']})
	.then(function(model) {
		console.log(model.toJSON());
		return res.render('ticket/view', {ticket : model.toJSON()[0]})
	})
}