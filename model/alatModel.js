let DB = require('../config/database');

var alat = DB.Model.extend({
	tableName : 'alat',
	idAttribute : 'id_alat'
});

module.exports = {
	Alat : alat
};