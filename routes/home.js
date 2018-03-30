var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController.js');
/* GET home page. */
router.get('/', homeController.index);

module.exports = router;