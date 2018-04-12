var exports = module.exports = {}
const Ticket = require('../model/ticket');
const User = require('../model/user');
const Alat = require('../model/alat');
var async = require('async');

// let generateCode = () => {
// 	new M.
// }

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
		console.log(locals.alat)
   		 res.render('ticket/create', {owners : locals.owner, alat : locals.alat});
	})
}

exports.store = (req, res) => {
	if (!req.files) return res.redirect('http://'+req.headers.host+'/ticket/create');

	let code = Date.now();
	let lampiran = req.files.lampiran;
	lampiran.mv('./public/img/'+lampiran.name, function(err){
		if(err) return res.redirect('http://'+req.headers.host+'/ticket/create');
	})
	var data = {
		'ticket_code' : code,
		'title' : req.body.title,
		'description' : req.body.description,
		'priority' : req.body.priority,
		'due_on' : req.body.due_on,
		'users_id' : req.body.user_id,
		'alat_id' : req.body.alat_id,
		'lampiran' : lampiran.name
	}

	new M.Ticket(data).save()
		.then(function(status){
			return res.redirect('http://'+req.headers.host+'/ticket');
		})
		.catch(function(err){
			console.log(err.stack);
		})
}