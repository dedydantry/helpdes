let DB = require('../config/database');

// const user = require('./user');
const Ticket = DB.model('Ticket', {
    tableName : 'ticket',
    idAttribute : 'id_ticket',
    user(){
    	return this.belongsTo(require('./user'), 'users_id');
    }
});

module.exports = Ticket;