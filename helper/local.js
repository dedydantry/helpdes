let Notif = require('../model/notif');
var exports = module.exports = {}

exports.getNotif = async(req, res, next) => {
    if(req.user){
        let notification = await Notif.where({ 'notif_too': req.user.id_users, 'notif_read':0 }).query((qb)=>{
            qb.limit(5)
        }).fetchAll({ withRelated: ['from'] });
        res.locals.notification = notification.toJSON()
    }
   next();
}

exports.online = (req, res, next) => {
    if (req.user) {
        if (!res.con.includes(req.user.email)) {
            res.con.push(req.user.email)
            res.io.emit('count-user', { 'online': res.con.length });
        }
    }
    res.locals.jumlah = res.con.length;
    next();
}

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
    }
    res.locals.user = null;
    res.redirect('/');
}