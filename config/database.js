var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'helpdesk',
    charset  : 'utf8'
  }
});

var database = require('bookshelf')(knex);

module.exports = database;
