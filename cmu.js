/*

cmu.js

*/
const fs = require('fs');
var loaded = false;
var cmuf = 'cmudict-0.7b.txt';
var cmu_phones = 'cmudict-0.7b.phones.txt';
var cmu_syms = 'cmudict-0.7b.phones.txt';

var hash = {};

/*
    Build the cache by reading the file.
    Each line becomes a lookup by word.
    skip comments
    key = word, value = phones
    
    TODO capture CMU version
*/
function loadCmu() {
    loaded = false;
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
            hash[sa[0]] = sa[1];
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