var exports = module.exports = {}
var M = require('../model/alatModel');

exports.index = (req, res) => {
	new M.Alat().fetchAll()
		.then(function(model){
			return res.render('alat/index', {alat : model.toJSON()});
        })
}

exports.create = (req, res) => {
    return res.render('alat/create');
}

exports.store =(req, res) => {
	new M.Alat(req.body).save()
		.then(function(){
			return res.redirect('http://'+req.headers.host+'/alat');
		})
		.catch(function(err){
			console.log(err.stack);
		});
	// console.log(req.body)
}

exports.edit = (req, res) => {
	new M.Alat({id_alat:req.params.alatId})
        .fetch()
        .then(function(model){
    		return res.render('alat/edit', {data : model.toJSON()});
        })
        .catch(function(err){
			console.log(err.stack);
		});
}

exports.update = (req, res) => {
	new M.Alat({'id_alat':req.params.alatId})
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
	new M.Alat({'id_alat':req.params.alatId})
		.destroy()
		.then(function(){
			return res.redirect('http://'+req.headers.host+'/alat');
		})
		.catch(function(err){
			console.log(err.stack);
		});
}