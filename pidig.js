/*

pidig.js

*/
const fs = require('fs');
var loaded = false;
var fname = 'pi-10000-digits.txt';
var tens = [];

function loadTenThousand() {
    loaded = false;
    try {
        var readline = require('readline');
        var instream = fs.createReadStream(fname);
        var rl = readline.createInterface({
            input: instream,
            terminal: false,
            historySize: 0,
        });
        rl.on('line', function(line) {
            line = line.trim();
            var sa = line.split(" ");
            Array.prototype.push.apply(tens, sa);
        });
        rl.on('close', () => {
            loaded = true;
            console.log('loadTenThousand complete!');
        });
    } catch (e) {
        console.log(e.message);
    }
}

function isLoaded() {
    return loaded;
}

// get ten digits straight from the array
function getTen(index) {
    if(index < 0 || index >= tens.length){
        return "";
    }
    return tens[index];
}

exports.isLoaded = isLoaded;
exports.loadTenThousand = loadTenThousand;
exports.getTen = getTen;


