var express = require('express');
var router = express.Router();
var userController = require('../controller/userController.js');


/* GET users listing. */
router.get('/', userController.index);
router.get('/create', userController.create);
router.get('/online', userController.online);
router.post('/store', userController.store);
router.get('/edit/:id_users', userController.edit);
router.post('/update/:id_users', userController.update);
router.post('/delete/:id_users', userController.destroy);

module.exports = router;
