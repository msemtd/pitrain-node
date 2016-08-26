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

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/pi', pi);
app.use('/scandig', scandig);

console.log("start CMU load");
app.locals.maj = require('./majormap');
app.locals.cmu = require('./cmu');
app.locals.cmu.loadCmu(major_mapping);
app.locals.pidig = require('./pidig');
app.locals.pidig.loadTenThousand();

// map string of phonemes to major digits
function major_mapping(phones) {
    var m = app.locals.maj.majmap;
    var sa = phones.split(" ");
    var ms = sa.map(function(p) { return m[p]; });
    return ms.join("");
}

app.get('/procdigcmu/', function(req, res) {
    var i = req.query.localcounter;
    var digits = req.query.digits;
    console.log("scan of '"+digits+"' index "+i);
    
    var minimumDigits = 2;
    var result_list = [];
    
    var c = app.locals.cmu.getCmuCount();
    res.type('text/plain');
    // TODO validate localcounter as number, etc.
    if(i < 0 || i >= c) {
        result_list.push({firstName:'finished!', lastName: 'at '+c, age:13});        
        res.json(result_list);
        return;
    }
    var maxtime = 4000;
    // TODO grab time
    var t1 = process.hrtime();
    var maxpage = 300000;
    var counter = 0;
    for(;i<c;i++){
        counter++;
        if(counter > maxpage) {
            result_list.push({firstName:'maxpage break!', lastName: 'index is now ' + i, age:13});
            break;
        }
        var e = app.locals.cmu.getItem(i);
        // [word, phonemes, mapped_phonemes, mapped_phonemes_length]
        if(e[3] < minimumDigits) 
            continue;
        // position found within digits
        var pos = digits.indexOf(e[2]);
        if(pos < 0) 
            continue;
        // decorate digits string with <before>[<found word>]<after>
        var decorated_digits = digits.split(e[2]).join("["+e[2]+"]");
        e.push(pos, i, decorated_digits);
        result_list.push({firstName:''+e, lastName: 'of ' + maxpage, age:13});
    }
    var dur = process.hrtime(t1);
    console.info("Execution time (hr): %ds %dms", dur[0], dur[1]/1000000);

    //~ var s = JSON.stringify(result_list);
    //~ console.log(s);
    res.json(result_list);
});

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
