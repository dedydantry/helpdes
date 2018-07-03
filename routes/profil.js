var express = require('express');
var router = express.Router();
var profilController = require('../controller/profilController');

router.get('/', profilController.index);
router.get('/password', profilController.password);
router.post('/changepassword', profilController.changepassword)
router.post('/notifread', profilController.notifread)

module.exports = router;