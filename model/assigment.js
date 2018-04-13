let DB = require('../config/database');

const Assigment = DB.model('Assigment', {
	tableName : 'assigment',
    idAttribute : 'id_assigment',
});

module.exports = Assigment;