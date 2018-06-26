let DB = require('../config/database');

const Assigment = DB.model('Assigment', {
	tableName : 'assigment',
    idAttribute : 'id_assigment',
    user(){
        return this.belongsTo(require('./user'), 'user_id');
    },

    ticket(){
        return this.belongsTo(require('./ticket'), 'ticket_id');
    }
});

module.exports = Assigment;