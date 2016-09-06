var express = require('express');
var router = express.Router();

/* 

Scan digits for CMU words

TODO show nice stuff on screen

*/
router.get('/:digs(\\d+)', function(req, res, next) {
    var digs = req.params.digs;
    var app = req.app;
    var maj = app.locals.maj;

    res.render('scandig', { 
        title: 'Scan digits for CMU words', 
        digits: digs,
        mode: "start",
    });
});

module.exports = router;
