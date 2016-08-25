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
    return hash[key];
}

function getFullCmuObject() {
    return hash;
}

function getCmuCount() {
    // return hash.entries().length;
    return list.length;
    // return list.entries().length;

}

function getItem(i) {
    // return a copy of the row
    return list[i].slice();
}

exports.isCmuLoaded = isCmuLoaded;
exports.loadCmu = loadCmu;
exports.getCmu = getCmu;
exports.getCmuCount = getCmuCount;
exports.getFullCmuObject = getFullCmuObject;
exports.getItem = getItem;
