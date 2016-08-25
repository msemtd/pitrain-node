var express = require('express');
var router = express.Router();

/* GET pi digits listing. 

TODO make start digits optional
TODO explain working in blocks of 10
TODO show nice stuff on screen

*/
router.get('/:start(\\d+)', function(req, res, next) {
    var startarg = req.params.start;
    var rounded = startarg/10;
    rounded = Math.trunc(rounded);
    var app = req.app;
    var pidig = app.locals.pidig;
    var block = pidig.getTen(rounded);
    rounded *= 10;

    var maj = app.locals.maj;
    // use the maj.digitPref 
    var digs = block.split('');
    var pp = digs.map(function(num){return maj.digitPref[num]});
    var phoneme = pp.join('');

    res.render('pi', { title: 'Pi digits', 
        startarg: startarg, 
        startactual: rounded,
        digits: block,
        phoneme: phoneme,
    });
});

// router.get('/', function(req, res, next) {
    
// });

module.exports = router;
