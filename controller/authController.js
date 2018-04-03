var exports = module.exports = {}
var passwordHash = require('password-hash');
var M = require('../model/userModel');
exports.signup = function(req, res) {
    res.render('auth/login');
}

exports.register = function(req, res) {
    res.render('auth/register');
}

exports.store = function(req, res) {
    var data = {
        email : req.body.email,
        password : req.body.password
    }
     new M.User({email:data.email})
        .fetch()
        .then(function(model){
            console.log(model.get('password'));
        })
}