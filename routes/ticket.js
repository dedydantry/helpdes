var express = require('express');
var router = express.Router();
var ticketController = require('../controller/ticketController');

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = null;
    res.redirect('/');
}
router.use(isLoggedIn);
router.get('/', ticketController.index);
router.get('/create', ticketController.create);
router.post('/store', ticketController.store);
router.get('/view/:ticket_code', ticketController.view);
router.get('/edit/:ticket_code', ticketController.edit);
router.post('/update/:id_ticket', ticketController.update);
router.post('/delete/:id_ticket', ticketController.delete);
router.post('/change/:id_ticket', ticketController.change);
router.post('/completes', ticketController.completes);
router.get('/search', ticketController.search);

module.exports = router;