let DB = require('../config/database');

const Alat = DB.model('Alat', {
	tableName : 'alat',
	idAttribute : 'id_alat'
});

module.exports = Alat;