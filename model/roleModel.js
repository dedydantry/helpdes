let DB = require('../config/database');

var role = DB.Model.extend({
    tableName : 'user_role',
    idAttribute : 'id',
    
});

module.exports = {
    Role : role
};