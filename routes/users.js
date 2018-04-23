var express = require('express');
var router = express.Router();
var userController = require('../controller/userController.js');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = null;
    res.redirect('/');
}
router.use(isLoggedIn);

/* GET users listing. */
router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', userController.store);

module.exports = router;
