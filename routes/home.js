var express = require('express');
var router = express.Router();
var homeController = require('../controller/homeController.js');
/* GET home page. */

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = null;
    res.redirect('/');
}
router.use(isLoggedIn);
router.get('/', homeController.index);

module.exports = router;