let createError      = require('http-errors');
let express          = require('express');
let path             = require('path');
let cookieParser     = require('cookie-parser');
let logger           = require('morgan');
let fileUpload       = require('express-fileupload');
let session          = require('express-session');
let passport         = require('passport');
let LocalStrategy    = require('passport-local').Strategy;
let expressValidator = require('express-validator');
let moment 			 = require('moment');

let client = [];

// var router = express.Router();
moment.locale('id'); 
// model
let User = require('./model/user');
let routes = require('./routes/index');

let app = express();


// local variabel
app.locals.base_url = 'http://192.168.43.170:3000/';
app.locals.stringCustom = (string) => {
	var strings = string.toUpperCase()
    return strings.charAt(0);
};

app.locals.moment = (momentParams) =>{
	return moment(momentParams);
}

app.locals.insertDecimal = (num) =>{
	return (Math.floor(num * 100) / 100).toFixed(1);
}

app.locals.isset = (params) => {
	return params !== 'undefined' ? params :'';
}
// view engine setup
app.io = require('socket.io')();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(function(req, res, next){
	res.con = client;
	next();
})
app.use(function(req, res, next){
	res.io = app.io;
	next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// express session
app.use(session({
	secret : 'secret',
	saveUninitialized : true,
	resave : true
}));

app.use(passport.initialize());
app.use(passport.session());
//load passport strategies
var jumlah = 0;
app.use(function(req, res, next){
	if(req.user){
		email = req.user.email
		if(!res.con.includes(req.user.email)){
			res.con.push(req.user.email)
			app.io.emit('count-user', {'online':res.con.length});
		}
	}
	res.locals.jumlah = res.con.length;
	next();
})
 
require('./config/passport.js')(passport,User);


app.use('/', routes.Auth);
app.use('/users', routes.User);
app.use('/home', routes.Home);
app.use('/ticket', routes.Ticket);
app.use('/comment', routes.Comment);
app.use('/report', routes.Report);
app.use('/profil', routes.Profil);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
