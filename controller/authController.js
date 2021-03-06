var exports = module.exports = {}
var passwordHash = require('password-hash');
var M = require('../model/user');

exports.signup = function(req, res) {
    if(req.user) {
        return res.redirect('/home')
    }
    return res.render('auth/login');
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

exports.logout = function(req, res) {
    res.con = res.con.splice(req.user.email);
    res.io.emit('count-user', {'online':res.con.length-1});
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}