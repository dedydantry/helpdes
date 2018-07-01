var exports = module.exports = {}
const Comment = require('../model/comment');
const Notif = require('../model/notif');
const Ticket = require('../model/ticket');

var async = require('async');

exports.store = async(req,res) => {
    var data = {
        'ticket_id' : req.body.ticket,
        'author' : req.user.id_users,
        'comment' : req.body.comment
    }
    const save = await new Comment(data).save();
    const resultComment = await Comment.where('id_comment', save.toJSON().id_comment)
                        .fetch({withRelated : ['user']});
    const ticket = await Ticket.where(req.params).fetch();
    let too;
    if(req.user.id_users == ticket.owner){
        too = ticket.assigment
    } else{
        too = too.ticket.owner
    }

    var notifData = {
        'ticket_code': code,
        'notif_from': req.user.id_users,
        'notif_too': too,
        'type': 0
    }
    var saveNotif = await new Notif(notifData).save();

    res.io.emit('new-comment', resultComment.toJSON())
    if(resultComment) 
        return res.render('ticket/comment', {comment : resultComment.toJSON()});
    return res.status(404).send('Not found');
}

exports.update = async(req, res) => {
    var data = {
        comment : req.body.comment
    }
    const updateComment = await new Comment({'id_comment' : req.params.id_comment}).save(data);
    if(!updateComment){
        return res.json({ status: 'failed' });
    }
    return res.json({ status: 'success' });  
}

exports.delete = async(req, res) => {
    const deleteComment = await new Comment({'id_comment' : req.params.id_comment}).destroy();
    if(!deleteComment){
        return res.json({ status: 'failed' });
    }
    return res.json({ status: 'success' });  
}