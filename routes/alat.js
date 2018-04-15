var express = require('express');
var router = express.Router();
var alatController = require('../controller/alatController.js');
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
router.use(isLoggedIn);
router.get('/', alatController.index);
router.get('/create',  alatController.create);
router.post('/store', alatController.store);
router.get('/edit/:alatId', alatController.edit);
router.post('/update/:alatId',  alatController.update);
router.post('/destroy/:alatId', alatController.delete);

module.exports = router;