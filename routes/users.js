var express = require('express');
var router = express.Router();
var userController = require('../controller/userController.js');

/* GET users listing. */
router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', userController.store);

module.exports = router;
