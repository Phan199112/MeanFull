var FeedbackModel = require('../db.models/feedback.model');
var log = require("../functions/logs");
var emailfunctions = require("../functions/email");


// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // save a new community
    // app.post('/savefeedback', manager.ensureLoggedIn('/users/login'), function (req, res, next) {
    app.post('/savefeedback', function (req, res, next) {
        var feedback =  req.body.feedback;
        var user = req.session.userid || "anonymous";

        emailfunctions.sendFeedback(feedback);


        // mongodb
        FeedbackModel.create({userid: user,
            message: feedback, timestamp: Date.now()}, function(err, k) {
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