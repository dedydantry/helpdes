var express = require('express');
var router = express.Router();
var reportController = require('../controller/reportController');

router.get('/', reportController.index);
router.get('/view', reportController.views);
router.get('/import', reportController.excel);
router.get('/technician', reportController.technician);
router.get('/details/:user_id', reportController.details);
router.get('/exportpdf', reportController.exportspdf);
router.get('/daily', reportController.daily); 
router.get('/users', reportController.users);
router.get('/userdetails/:owner', reportController.userdetail);


router.get('/printperiode', reportController.printperiode);
router.get('/printtechnician', reportController.printoperator);
router.get('/printdetails/:user_id', reportController.printdetails);
router.get('/ticketstatus', reportController.ticketstatus);
router.get('/ticketstatusprint', reportController.ticketstatusprint);
router.get('/printdaily', reportController.printdaily); 
router.get('/printuser', reportController.printuser);
router.get('/printuserdetail/:owner', reportController.printuserdetail);
module.exports = router;