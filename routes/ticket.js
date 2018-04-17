var express = require('express');
var router = express.Router();
var ticketController = require('../controller/ticketController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
// router.use(isLoggedIn);
router.get('/', ticketController.index);
router.get('/create', ticketController.create);
router.post('/store', ticketController.store);
router.get('/view/:ticket_code', ticketController.view)
router.get('/edit/:ticket_code', ticketController.edit)

module.exports = router;