var FeedbackModel = require('../db.models/feedback.model');
var log = require("../functions/logs");

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // save a new community
    app.post('/savefeedback', manager.ensureLoggedIn('/users/login'), function (req, res, next) {
        var receivedData =  req.body;

        // mongodb
        FeedbackModel.create({userid: req.session.userid,
            message: receivedData.feedback, timestamp: Date.now()}, function(err, k) {
            if (err) {
                res.json({status: 0});
            } else {
                log.writeLog(req.session.userid, 'feedback send');
                res.json({status: 1});
            }
        }).catch(function () {
            res.json({status: 0});
        });
    });

};