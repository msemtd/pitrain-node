var express = require('express');
var router = express.Router();

/* 

Route: scanfull

Scan given digit string for CMU words in Major form - full DataTables

*/
router.get('/:digits(\\d+)', function(req, res, next) {
    var app = req.app;
    var digits = req.params.digits;
    var maj = app.locals.maj;

    var simple = maj.mapSimple(digits);
    var cmucount = app.locals.cmu.getCmuCount();

    res.render('scanfull', { 
        "title": 'Scan digits for CMU words', 
        "digits": digits,
        "simple": simple,
        "cmucount": cmucount
    });
});

module.exports = router;
