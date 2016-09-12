/*

    cmu.js

    Each CMU dictionary entry is held in a list and can be accessed 
    by a hash. The entries look like this...
    
    [word, phonemes, mapped_phonemes, mapped_phonemes_length]

    The entire CMU dictionary is cached from the standard released 
    file 'cmudict-0.7b.txt' at startup. The phoneme mapping is 
    performed during this slurp.

*/
const fs = require('fs');
var loaded = false;
var cmuf = 'cmudict-0.7b.txt';
var cmuf_phones = 'cmudict-0.7b.phones.txt';
var cmuf_syms = 'cmudict-0.7b.symbols.txt';
var mapped = false;

var hash = {};
var list = [];

/*
    Build the cache by reading the file.
    Each line becomes a lookup by word.
    skip comments
    key = word, value = phones
    When mapped, the value of the hash is an array [word, phonemes, mapped_phonemes, mapped_phonemes_length]

    TODO capture CMU version
    
*/
function loadCmu(mapfunc) {
    loaded = false;
    mapped = false;
    if(typeof(mapfunc) === 'function'){
        mapped = true;
    }
    try {
        var readline = require('readline');
        // stream = require('stream');
        var instream = fs.createReadStream(cmuf);
        var rl = readline.createInterface({
            input: instream,
            //output: outstream,
            terminal: false,
            historySize: 0,
        });
        rl.on('line', function(line) {
            //console.log(line);
            line = line.trim();
            if(line.startsWith(';;;')) return;
            // split line on whitespace
            var sa = line.split("  ");
            if(sa.length != 2) return;
            var word = sa[0];
            var phon = sa[1];
            var v = phon;
            if(mapped){
                var m = mapfunc(phon);
                v = [word, phon, m, m.length];
            }
            list.push(v);
            hash[word] = v;
            // list[word] = v;
            // if(list.length == 2000){
                // var s = JSON.stringify(list);
                // console.log(s);
            // }
        });
        rl.on('close', () => {
            loaded = true;
            // var keys = Object.keys(hash);
            // console.log("loadCmu complete: word count = " + keys.length);
            console.log("loadCmu complete: word count = " + list.length);
        });
    } catch (e) {
        console.log(e.message);
    }
}

function isCmuLoaded() {
    return loaded;
}

function getCmu(key) {
    var got = hash[key];
    return (got == null) ? null : got.slice();
}

function getCmuCount() {
    return list.length;
}

function getItem(i) {
    // return a copy of the row
    return list[i].slice();
}

exports.isCmuLoaded = isCmuLoaded;
exports.loadCmu = loadCmu;
exports.getCmu = getCmu;
exports.getCmuCount = getCmuCount;
exports.getItem = getItem;
