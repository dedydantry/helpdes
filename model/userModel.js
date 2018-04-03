let DB = require('../config/database');

var users = DB.Model.extend({
	tableName : 'users',
	idAttribute : 'id_users'
});

module.exports = {
	User : users
};