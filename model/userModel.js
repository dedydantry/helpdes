let DB = require('../config/database');

var users = DB.Model.extend({
	tableName : 'users',
	idAttribute : 'id_users',
    roles: function() {
        return this.belongsToMany(Role, 'user_role');
    }
});

module.exports = {
	User : users
};