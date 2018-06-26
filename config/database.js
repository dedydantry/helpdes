const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '19121992',
    database : 'helpdesk',
    charset  : 'utf8'
  }
});

const Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');
module.exports = Bookshelf;
