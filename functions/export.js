var fs = require('fs');
var randomfunction = require('./random');

exports.exportcsv = function exportcsv(data) {

    var random = randomfunction.makeRandomFilename();
    var dest = "/tmp/"+random+".csv";
    fs.writeFileSync(dest, data);

    return dest;

};