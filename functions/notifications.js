var EventModel = require('../db.models/event.model');

function createNotification(user, fromuser, type, message, data) {
    EventModel.create(
        {
            userid: user,
            fromuser: fromuser,
            type: type,
            message: message,
            data: data,
            seen: false,
            acted: false,
            timestamp: Date.now()
        },
        function(err, k) {
            if (err) {
                //console.log("Error in writing notification "+err);
            } else {
            }
        });
}

exports.createNotification = createNotification;

exports.recordFriendRequest = function (userMakingRequest, userRequested, requestId) {
    createNotification(userRequested.id, userMakingRequest.id, "network", null, requestId);
};
