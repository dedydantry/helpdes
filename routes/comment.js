var express = require('express');
var router = express.Router();
var commentController = require('../controller/commentController.js');
// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()){
//         res.locals.user = req.user;
//         return next();
//     }
//     res.locals.user = null;
//     res.redirect('/');
// }
// router.use(isLoggedIn);
router.post('/', commentController.store);
router.post('/update/:id_comment', commentController.update);
router.post('/destroy/:id_comment', commentController.delete);

module.exports = router;