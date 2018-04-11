let DB = require('../config/database');

var ticket = DB.Model.extend({
    tableName : 'ticket',
    idAttribute : 'id_ticket'
});

module.exports = {
    Ticket : ticket
};