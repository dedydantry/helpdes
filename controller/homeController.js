var exports = module.exports = {}
const Ticket = require('../model/ticket');
const User = require('../model/user');
let moment = require('moment');
const now = moment().format('YYYY-MM-DD')
const month = moment().format('YYYY-MM')

exports.index = async(req, res) => {
    let total, today, pending, open, complete;
    if(req.user.roles[0].role_name == 'member'){
        total = await Ticket.where('owner', req.user.id_users).count('id_ticket');
        today =  await Ticket.where('crated_at', 'like', now+'%').where('owner', req.user.id_users).count('id_ticket');
        pending = await Ticket.where({'status': 2, 'owner':req.user.id_users}).count();
        open = await Ticket.where({'status': 0, 'owner':req.user.id_users}).count();
        complete = await Ticket.where({'status': 1, 'owner':req.user.id_users}).count();
    } else if(req.user.roles[0].role_name == 'administrator') {
         total = await Ticket.count('id_ticket');
         today = await Ticket.where('crated_at', 'like', now+'%').count('id_ticket');
         pending = await Ticket.where('status', 2).count();
         open = await Ticket.where('status', 0).count();
         complete = await Ticket.where('status', 1).count();
    } else {
        total = await Ticket.where('assignment', req.user.id_users).count('id_ticket');
        today =  await Ticket.where('crated_at', 'like', now+'%').where('assignment', req.user.id_users).count('id_ticket');
        pending = await Ticket.where({'status': 2, 'assignment':req.user.id_users}).count();
        open = await Ticket.where({'status': 0, 'assignment':req.user.id_users}).count();
        complete = await Ticket.where({'status': 1, 'assignment':req.user.id_users}).count();
    }
    let countUser = await User.count('id_users');
    
    
    res.render('dashboard',{
        total : total, 
        today : today, 
        pending : pending,
        open : open,
        complete : complete,
        countuser : countUser
    });
}