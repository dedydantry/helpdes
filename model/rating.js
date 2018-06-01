let DB = require('../config/database');
const user = require('./user');
const ticket = require('./ticket');
const Rating = DB.model('Rating', {
    tableName : 'rating',
    idAttribute : 'id_rating',
    user(){
        return this.belongsTo(user, 'user_id')
    },

    ticket(){
        return this.belongsTo(ticket, 'ticket_id')
    }
})

module.exports = Rating