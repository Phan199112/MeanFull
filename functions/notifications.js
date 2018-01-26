var EventModel = require('../db.models/event.model');

exports.createNotification = function createNotification(user, fromuser, type, message, data) {
    EventModel.create({userid: user, fromuser: fromuser, type: type, message: message, data: data, seen: false, acted: false, timestamp: Date.now()},
        function(err, k) {
            if (err) {
                console.log("Error in writing notification "+err);
            } else {
                console.log("Wrote a notification");
            }
        });
};