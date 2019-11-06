var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {Mongoose}=require('./untils/config.js')
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');         //引入路由
var adminRouter = require('./routes/admin');        //引入路由

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '#$#%$#$%#',
  name:'sessionId',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:1000*60*60
  }
}))
app.use('/', indexRouter);
app.use('/api2/users', usersRouter);          //路由路径配置
app.use('/api2/admin',adminRouter);           //路由路径配置

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* Mongoose.connect(); */

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
