var exports = module.exports = {}
var passwordHash = require('password-hash');
var connection = require('../config/database');
exports.signup = function(req, res) {
    res.render('auth/login');
}

exports.register = function(req, res) {
    res.render('auth/register');
}

exports.store = function(req, res) {
    // var hashedPassword = passwordHash.generate('password123');
    // console.log(hashedPassword);
    var data = {
        email : req.body.email,
        password : req.body.password
    }
    console.log(data.email)
    connection.query('SELECT * FROM users WHERE email ="'+data.email+'"', function (err, rows, fields) {
        if (err) throw err
        if(passwordHash.verify(data.password, rows[0].password)){
            console.log('login sukses');
            return true;
        }

        console.log('user tidak ditemukan');
        return false;
    })
}