var exports = module.exports = {}
const Comment = require('../model/comment');
const Assigment = require('../model/assigment');
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
    if(resultComment) return res.render('ticket/comment', {comment : resultComment.toJSON()});

    res.status(404).send('Not found');
}