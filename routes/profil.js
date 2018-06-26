var express = require('express');
var router = express.Router();
var profilController = require('../controller/profilController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = null;
    res.redirect('/');
}
router.use(isLoggedIn);
router.get('/', profilController.index);
router.get('/password', profilController.password);
router.post('/changepassword', profilController.changepassword)
router.post('/notifread', profilController.notifread)

module.exports = router;