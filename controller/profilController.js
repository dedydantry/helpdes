var exports = module.exports = {}
let passwordHash = require('password-hash');
let User = require('../model/user');
let Ticket = require('../model/ticket');
let Notif = require('../model/notif');
exports.index = async(req, res) =>{
    let dataNotif = await Notif.where({'notif_too' : req.user.id_users})
                              .orderBy('id_notif', 'DESC')
                              .fetchAll({withRelated : ['from']});
    return res.render('profil/index', {notif : dataNotif.toJSON()});
}

exports.password = async(req, res) => {
    return res.render('profil/password');
}

exports.changepassword = async(req,res) =>{
    let dataUser = await User.where('email', req.user.email).fetch();
    if(dataUser) {
        let getUSer = dataUser.toJSON();
        let password = passwordHash.generate(req.body.password_conf);
        console.log(req.body.password)
        if(passwordHash.verify(req.body.password, getUSer.password)){
            let update = new User({'id_users' : req.user.id_users}).save({'password' :password},{method:'update', patch: true });
            if(update){
                return res.json({'status' : 'success'});
            } else{
              return res.json({'status' : 'failed'});
            }
        } else{
              return res.json({'status' : 'failed'});
        }
    }
    else{
      return res.json({'status' : 'failed'});
    }
    // console.log(dataUser.toJSON());
}


exports.notifread = async(req, res) => {
    var update = await new Notif(req.body).save({'notif_read': 1}, {method:'update', patch: true });
    if(update){
        return res.json({'status': 'success'});
    }
    return res.json({'status':'failed'});
}