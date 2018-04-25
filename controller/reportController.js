var exports = module.exports = {}
const Ticket = require('../model/ticket');

exports.index = async(req,res) => {
    return res.render('report/index');
}

exports.views = async(req, res) => {
    var from = req.query.from;
    var to = req.query.to;
    let view = await Ticket.query(function(qb){
        qb.whereBetween('crated_at', [from, to]);
    }).fetchAll({withRelated: ['user']});
   return res.render('report/view', {report : view.toJSON(), from :from, to:to});
}