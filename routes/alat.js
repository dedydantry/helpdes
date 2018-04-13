var express = require('express');
var router = express.Router();
var alatController = require('../controller/alatController.js');
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

router.get('/', isLoggedIn, alatController.index);
router.get('/create', isLoggedIn,  alatController.create);
router.post('/store', isLoggedIn, alatController.store);
router.get('/edit/:alatId', isLoggedIn, alatController.edit);
router.post('/update/:alatId', isLoggedIn,  alatController.update);
router.post('/destroy/:alatId', isLoggedIn, alatController.delete);

module.exports = router;