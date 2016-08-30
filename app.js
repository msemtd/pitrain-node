var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var pi = require('./routes/pi');
var scandig = require('./routes/scandig');
var digcmu = require('./routes/digcmu');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/pi', pi);
app.use('/scandig', scandig);
app.use('/digcmu', digcmu);

console.log("start CMU load");
app.locals.maj = require('./majormap');
app.locals.cmu = require('./cmu');
app.locals.cmu.loadCmu(major_mapping);
app.locals.pidig = require('./pidig');
app.locals.pidig.loadTenThousand();

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// map string of phonemes to major digits
function major_mapping(phones) {
    var m = app.locals.maj.majmap;
    var sa = phones.split(" ");
    var ms = sa.map(function(p) { return m[p]; });
    return ms.join("");
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
