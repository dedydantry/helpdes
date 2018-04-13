var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController.js');
/* GET home page. */
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
router.get('/',isLoggedIn, homeController.index);

module.exports = router;