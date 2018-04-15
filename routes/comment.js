var express = require('express');
var router = express.Router();
var commentController = require('../controller/commentController.js');
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
router.use(isLoggedIn);
router.post('/', commentController.store);

module.exports = router;