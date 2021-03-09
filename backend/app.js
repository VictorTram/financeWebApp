var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var cors =require('cors');

var app = express();

// Needed for Middlware
// Extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


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


app.use(function(req, res) {
  console.log("Access Control");
  //res.setheader('Access-Control-Allow-Origin', "*");
  res.setHeader("Access-Control-Allow-Origin", 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  console.log("test");
});

app.listen(app.get('port'), () =>{
  console.log(`App running on port ${app.get('port')}`);
});

module.exports = app;
