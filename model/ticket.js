let DB = require('../config/database');

// const user = require('./user');
const Ticket = DB.model('Ticket', {
    tableName : 'ticket',
    idAttribute : 'id_ticket',
    user(){
    	return this.belongsTo(require('./user'), 'owner');
    },
    assigment(){
        return this.belongsTo(require('./assigment'), 'id_ticket');
    }
});

module.exports = Ticket;