var LogModel = require('../db.models/log.model');

exports.writeLog = function writeLog(user, action, ip) {
    LogModel.create({userid: user, action: action, timestamp: Date.now(), ip: ip},
        function(err, k) {
            if (err) {
                console.log("Error in writing to log "+err);
            } else {
                console.log("Wrote to log");
            }
    });
};
