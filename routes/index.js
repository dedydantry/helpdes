let usersRouter      = require('./users');
let authRouter       = require('./auth');
let homeRouter       = require('./home');
let ticketRouter     = require('./ticket');
let commentRouter    = require('./comment');
let reportRouter     = require('./report');
let profilRouter    = require('./profil');

module.exports = {
  User : usersRouter,
  Auth : authRouter,
  Home : homeRouter,
  Ticket : ticketRouter,
  Comment : commentRouter,
  Report : reportRouter,
  Profil : profilRouter
};
