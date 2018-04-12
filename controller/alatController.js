var exports = module.exports = {}
var Alat = require('../model/alat');

exports.index = (req, res) => {
	Alat.fetchAll()
	.then(collection => res.render('alat/index', {alat : collection.toJSON()}))
	.catch(err => console.log(err.stack))
}

exports.create = (req, res) => {
    return res.render('alat/create');
}

exports.store =(req, res) => {
	new Alat(req.body).save()
		.then(function(){
			return res.redirect('http://'+req.headers.host+'/alat');
		})
		.catch(function(err){
			console.log(err.stack);
		});
	// console.log(req.body)
}

exports.edit = (req, res) => {
	new Alat({id_alat:req.params.alatId})
        .fetch()
        .then(function(model){
    		return res.render('alat/edit', {data : model.toJSON()});
        })
        .catch(function(err){
			console.log(err.stack);
		});
}

exports.update = (req, res) => {
	new Alat({'id_alat':req.params.alatId})
		.save(req.body)
		.then(function(){
			console.log(req.headers.host)
			return res.redirect('http://'+req.headers.host+'/alat');
		})
		.catch(function(err){
			console.log(err.stack);
		});
}

exports.delete = (req, res) => {
	new Alat({'id_alat':req.params.alatId})
		.destroy()
		.then(function(){
			return res.redirect('http://'+req.headers.host+'/alat');
		})
		.catch(function(err){
			console.log(err.stack);
		});
}