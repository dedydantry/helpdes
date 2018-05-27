let DB = require('../config/database');
const user = require('./user');
const Rating = DB.model('Rating', {
    tableName : 'rating',
    idAttribute : 'id_rating',
    user(){
        return this.belongsTo(user, 'user_id')
    },
})

module.exports = Rating