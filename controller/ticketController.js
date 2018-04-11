var exports = module.exports = {}
var M = require('../model/ticketModel');

exports.index = (req,res) => {
    new M.Ticket().fetchAll()
        .then(function(model){
            return res.render('ticket/index', {'ticket' : model.toJSON()});
        })
        .catch(function(err){
            console.log(err.stack);
        })
}

exports.create = (req, res) => {
    return res.render('ticket/create');
}