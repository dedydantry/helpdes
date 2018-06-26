let DB = require('../config/database');

const user = require('./user');
const ticket = require('./ticket')
const Notif = DB.model('notif', {
    tableName : 'notif',
    idAttribute : 'id_notif',
    from(){
    	return this.belongsTo(user, 'notif_from');
    },

    to(){
    	return this.belongsTo(user, 'notif_too');
    },

    // ticket(){
    //     return this.belongsTo(ticket, 'ticket_code');
    // }
});

module.exports = Notif;