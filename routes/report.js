var express = require('express');
var router = express.Router();
var reportController = require('../controller/reportController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = null;
    res.redirect('/');
}
router.use(isLoggedIn);
router.get('/', reportController.index);
router.get('/view', reportController.views);
router.get('/import', reportController.excel);
router.get('/operator', reportController.operator);

module.exports = router;