let DB = require('../config/database');

const User_role = DB.model('User_role', {
  	tableName: 'user_role',
});

module.exports = User_role;