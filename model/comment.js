let DB = require('../config/database');

const Comment = DB.model('Comment', {
	tableName : 'ticket_comment',
    idAttribute : 'id_comment',
    ticket(){
        return this.belongsTo(require('./ticket'), 'ticket_id');
    },
    user(){
        return this.belongsTo(require('./user'), 'author');
    }
});

module.exports = Comment;