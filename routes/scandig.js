var express = require('express');
var router = express.Router();

/* 

Scan digits for CMU words

TODO show nice stuff on screen

Start operation - issue a 

*/
router.get('/:digs(\\d+)', function(req, res, next) {
    var digs = req.params.digs;
    var app = req.app;
    var maj = app.locals.maj;

    res.render('scandig', { 
        title: 'Scan digits', 
        digits: digs,
        mode: "start",
    });
});

// router.get('/', function(req, res, next) {
    
// });

module.exports = router;
