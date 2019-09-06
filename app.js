var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registrosRouter = require('./routes/registros');
var sensoresRouter = require('./routes/sensores');
var actuadoresRouter = require('./routes/actuadores');
var estadosRouter = require('./routes/estados');
var contextosRouter = require('./routes/contextos');
var nodosRouter = require('./routes/nodos');

var cors = require('cors');

var app = express();
app.use(function(err, req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({credentials: true, origin: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registros', registrosRouter);
app.use('/sensores', sensoresRouter);
app.use('/actuadores', actuadoresRouter);
app.use('/estados', estadosRouter);
app.use('/contextos', contextosRouter);
app.use('/nodos', nodosRouter);

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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
  res.setHeader('Content-Type', 'application/json');
  res.render('error');
});

module.exports = app;