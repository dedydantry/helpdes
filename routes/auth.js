var express = require('express');
var router = express.Router();
var authController = require('../controller/authController.js');
/* GET home page. */
router.get('/', authController.signup);
router.get('/register', authController.register);
router.post('/', authController.store);

module.exports = router;
