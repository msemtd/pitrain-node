/*

cmu.js

*/
const fs = require('fs');
var loaded = false;
var cmuf = 'cmudict-0.7b.txt';
var cmu_phones = 'cmudict-0.7b.phones.txt';
var cmu_syms = 'cmudict-0.7b.phones.txt';
// when mapped, the value of the hash is an array [word, phonemes, mapped_phonemes, mapped_phonemes_length]
var mapped = false;

var hash = {};

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
            hash[word] = v;
        });
        rl.on('close', () => {
            loaded = true;
            console.log('loadCmu complete!');
        });
    } catch (e) {
        console.log(e.message);
    }
}

function isCmuLoaded() {
    return loaded;
}

function getCmu(key) {
    return hash[key];
}

exports.isCmuLoaded = isCmuLoaded;
exports.loadCmu = loadCmu;
exports.getCmu = getCmu;