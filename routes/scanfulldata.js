var express = require('express');
var router = express.Router();

/* 

Route: scanfulldata

Scan given digits for CMU words in Major form and return as JSON list

TODO exact scan option rather than words contained scan

*/
router.get('/:digits(\\d+)', function(req, res, next) {
    var app = req.app;
    var digits = req.params.digits;
    console.log("scanfulldata of '"+digits+"'...");
    var maj = app.locals.maj;
    var cmu = app.locals.cmu;
    
    var cmucount = cmu.getCmuCount();
    var minimumDigits = 2;
    var singlecase = (digits.length == 1);
    
    var result_list = [];
    var t1 = process.hrtime();
    for(var i = 0; i < cmucount; i++){
        var e = cmu.getItem(i);
        // [word, phonemes, mapped_phonemes, mapped_phonemes_length]
        if(e[3] < minimumDigits) {
            // allow special case for single digit scan bearing in mind that zero length mappings also exist!
            if(!singlecase || e[3] != 1)
                continue;
        }
        // position found within digits
        var pos = digits.indexOf(e[2]);
        if(pos < 0) 
            continue;
        // decorate digits string with <before>[<found word>]<after>
        var decorated_digits = digits.split(e[2]).join("["+e[2]+"]");
        e.push(pos, i, decorated_digits);
        result_list.push(e);
    }

    var dur = process.hrtime(t1);
    console.info("Execution time (hr): %ds %dms", dur[0], dur[1]/1000000);

    //~ var s = JSON.stringify(result_list);
    //~ console.log(s);
    
    res.type('text/plain');
    res.json(result_list);
});

module.exports = router;
