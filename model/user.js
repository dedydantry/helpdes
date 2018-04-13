let DB = require('../config/database');

const User = DB.model('Users', {
    tableName : 'users',
    idAttribute : 'id_users',
    roles(){
    	return this.belongsToMany(require('./role'), 'user_role', 'user_id', 'role_id');
    },
    user_role(){
        return this.belongsTo(require('./user_role', 'user_id'));
    }
    
});

module.exports = User;