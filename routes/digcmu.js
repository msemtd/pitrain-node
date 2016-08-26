var express = require('express');
var router = express.Router();

/* 
    Ajax search of CMU dictionary
*/
router.get('/', function(req, res) {
    var app = req.app;
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

module.exports = router;
