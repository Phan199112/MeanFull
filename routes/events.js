var EventModel = require('../db.models/event.model');
var UserModel = require('../db.models/user.model');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    app.get('/events/list', manager.ensureLoggedIn('/users/login'), function(req, res) {

        var outputevents = [];

        new Promise(function(resolve, reject) {
            EventModel.find({userid: req.session.userid}).cursor()
                .on('data', function(event){
                    outputevents.push({type: event.type, message: event.message, data: event.data, id: hashids.encodeHex(event._id), seen: event.seen});
                })
                .on('error', function(err){
                    // handle error
                    reject();
                })
                .on('end', function(){
                    // final callback
                    resolve();
                });
        })
            .then(function() {
                res.json({status: 1, events: outputevents});
        })
            .catch(function() {
                res.json({status: 0});
        });
    });

    app.post('/events/seen', manager.ensureLoggedIn('/users/login'), function(req, res) {
        // event id
        var eventid = hashids.decodeHex(req.body.id);
        // update logs
        EventModel.findOneAndUpdate({_id: eventid, userid: req.session.userid}, {$set: {seen: true}}, function(err, k) {
            if (err) {
                res.json({status: 0});
            } else {
                res.json({status: 1});
            }
        });
    });

    app.post('/events/delete', manager.ensureLoggedIn('/users/login'), function(req, res) {
        // event id
        var eventid = hashids.decodeHex(req.body.id);
        // update logs
        EventModel.remove({_id: eventid, userid: req.session.userid}, function(err, k) {
            if (err) {
                res.json({status: 0});
            } else {
                res.json({status: 1});
            }
        });
    });

};