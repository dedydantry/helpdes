var express = require('express');
var router = express.Router();
var userController = require('../controller/userController.js');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
router.use(isLoggedIn);

/* GET users listing. */
router.get('/', userController.index);
router.get('/create', userController.create);
router.post('/store', userController.store);

module.exports = router;
