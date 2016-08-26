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

app.get('/procdigcmu/', function(req, res) {
    var i = req.query.localcounter;
    var digits = req.query.digits;
    console.log("scan of '"+digits+"' index "+i);
    
    var minimumDigits = 2;
    var cmucount = app.locals.cmu.getCmuCount();

    var result_list = [];
    var full_data = { 
        'scanstatus':'finished', 
        'newindex':0, 
        'cmucount':cmucount, 
        'results_tab': result_list 
    };
    
    var maxtime = 4000;
    // TODO grab time
    var t1 = process.hrtime();
    var maxpage = 100000;
    // TODO validate localcounter as number, etc.
    if(i < 0 || i >= cmucount) {
        full_data.scanstatus = "out of range "+i;
        i = cmucount;
    }
    var counter = 0;
    for(; i < cmucount; i++){
        counter++;
        if(counter > maxpage) {
            full_data.scanstatus = "maxpage break " + maxpage;
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
        result_list.push(e);
        // result_list.push({firstName:''+e, lastName: 'of ' + maxpage, age:13});
    }
    full_data.newindex = i;
    var dur = process.hrtime(t1);
    console.info("Execution time (hr): %ds %dms", dur[0], dur[1]/1000000);

    //~ var s = JSON.stringify(result_list);
    //~ console.log(s);
    
    res.type('text/plain');
    res.json(full_data);
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
