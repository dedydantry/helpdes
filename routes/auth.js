var express = require('express');
var router = express.Router();
let passport = require('passport');

var authController = require('../controller/authController.js');
/* GET home page. */

router.get('/',  authController.signup);
router.get('/register', authController.register);
router.post('/', passport.authenticate('local-signin', {
	successRedirect: '/home',
 
    failureRedirect: '/'
}));

router.get('/logout', authController.logout)

module.exports = router;
