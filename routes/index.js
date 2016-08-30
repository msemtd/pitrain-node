var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var app = req.app;
    var pidig = app.locals.pidig;
    
    var width = 5;
    var limit = 100;
    
    var jsonrow = [0];
    var jsontab = [];
    var col = 0;
    for(var i = 0; i < limit; i++){
        var ten = pidig.getTen(i);
        // add to tab...
        jsonrow.push(ten);
        if(jsonrow.length > width){
            jsontab.push(jsonrow);
            jsonrow = [(i+1)*10];
        }
    }
    var tabdatastring = JSON.stringify(jsontab);
    //console.log("passing pi tab as "+tabdatastring);
    res.render('index', { title: 'Pi Major Mnemonics Training Tool', pitab: tabdatastring});
});

module.exports = router;
