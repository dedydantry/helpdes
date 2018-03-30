var config = {
    database: {
        host:      'localhost',     // database host
        user:       'root',         // your database username
        password: '',         // your database password
        port:       3306,         // default MySQL port
        db:       'helpdesk'         // your database name
    },
}

var mysql = require('mysql')

var database = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    database : config.database.db
});

database.connect()

module.exports = database;