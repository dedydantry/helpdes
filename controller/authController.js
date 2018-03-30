var exports = module.exports = {}
 
exports.signup = function(req, res) {
    res.render('auth/login');
}

exports.register = function(req, res) {
    res.render('auth/register');
}