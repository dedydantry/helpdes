var exports = module.exports = {}
const Ticket = require('../model/ticket');
let moment = require('moment');
const now = moment().format('YYYY-MM-DD')
const month = moment().format('YYYY-MM')
exports.index = async(req, res) => {
    let total = await Ticket.count('id_ticket');
    let today = await Ticket.where('crated_at', 'like', now+'%').count('id_ticket');
    let pending = await Ticket.where('status', 2).count();
    let open = await Ticket.where('status', 0).count();
    res.render('dashboard',{
        total : total, 
        today : today, 
        pending : pending,
        open : open,
    });
}