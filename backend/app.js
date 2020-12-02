var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors =require('cors');

var app = express();

// Mongoose to be used to connect to mongoDB
var mongoose = require('mongoose');

// MongoDB server connectionString 
var config = require('./config');

// Using CORS
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Initialize mongoDB Connection
function _initializeModels(){
  mongoose.connect(config.db);
  mongoose.connection.on('error', (err)=>{
    console.log("mongodb failed to connect");
  })
}

_initializeModels();

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

app.use(function(req, res) {
  console.log("Access Control");
  //res.setheader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  console.log("test");
});

app.listen(app.get('port'));

module.exports = app;
