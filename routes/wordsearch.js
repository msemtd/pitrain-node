var express = require('express');
var router = express.Router();

/* 

Route: wordsearch

Lookup word in CMU

*/
router.get('/:word(\\w+)', function(req, res, next) {
    var word = req.params.word;
    var wordup = word.toUpperCase();
    var cmu = req.app.locals.cmu;
    var cmucount = cmu.getCmuCount();
    var tab = [];
    var row = cmu.getCmu(wordup);
    var found = false;
    if(row != null) {
        // add 3 extra columns
        row.push('n/a', 'n/a', 'n/a');
        tab.push(row);
        found = true;
    }
    
    var jss = JSON.stringify(tab);
    
    console.log('word search for "' + word + '" came back with ' + jss);

    res.render('wordsearch', { 
        "title": 'CMU word search', 
        "word": word,
        "cmucount": cmucount,
        "datatab": jss,
        "found": found,
    });
});

module.exports = router;
