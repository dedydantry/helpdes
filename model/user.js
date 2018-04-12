let DB = require('../config/database');

const User = DB.model('Users', {
    tableName : 'users',
    idAttribute : 'id_users',
    ticket(){
    	return this.hasMany(require('./ticket'), 'users_id');
    },
    roles(){
    	return this.belongsToMany(require('./role'), 'user_role');
    }
});

module.exports = User;