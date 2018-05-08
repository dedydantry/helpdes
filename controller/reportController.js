var exports = module.exports = {}
const Ticket = require('../model/ticket');
let moment = require('moment');
const now = moment().format('YYYY-MM-DD')
exports.index = async(req,res) => {
    console.log(now)
    let total = await Ticket.count('id_ticket');
    let today = await Ticket.where('crated_at', 'like', now+'%').count('id_ticket')
    
    return res.render('report/index', {total : total, today : today});
}

exports.views = async(req, res) => {
    var from = req.query.from;
    var to = req.query.to;
    let view = await Ticket.query(function(qb){
        qb.whereBetween('crated_at', [from, to]);
    }).fetchAll({withRelated: ['user']});
   return res.render('report/view', {report : view.toJSON(), from :from, to:to});
}

exports.excel = async(req, res) => {
    
}