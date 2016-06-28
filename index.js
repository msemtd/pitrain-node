var port = 9912;
require('console-stamp')( console, {  } );
var express = require('express');
var app = express();
var path = require('path');
var favicon = require('serve-favicon');
app.disable('x-powered-by'); // security by obscurity: mask attack surface
app.use(favicon(path.join(__dirname, 'favicon.ico')));

console.log('app start');
console.log("start CMU load");
app.locals.cmu = require('./cmu');
app.locals.cmu.loadCmu();

var router = express.Router();

app.get('/', function (req, res) {
    console.log('serving root');
    var cmu = app.locals.cmu;
    var info = "INFO = ";
    if(cmu.isCmuLoaded()){
        info +=  cmu.getCmu("INFO");
    } else {
        info = "(CMU is not loaded)";
    }
    res.send('Hello! Nothing to see here!\n'+"CMU says "+ info);
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, function () {
    console.log('app listening on port '+ port);
});


//----------------------------------------------------------------------------
// utils
function getUptime() {
    return process.uptime();
}

function avoidCache(res) {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.
}

