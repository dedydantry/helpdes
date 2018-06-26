let DB = require('../config/database');

const user = require('./user');
const Ticket = DB.model('Ticket', {
    tableName : 'ticket',
    idAttribute : 'id_ticket',
    user(){
    	return this.belongsTo(user, 'owner');
    },
    assigments(){
        return this.belongsTo(user, 'assignment');
    }
});

module.exports = Ticket;