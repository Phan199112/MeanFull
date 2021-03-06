var EventModel = require('../db.models/event.model');
var UserModel = require('../db.models/user.model');
var GroupModel = require('../db.models/group.model');
var PostModel = require('../db.models/post.model');
var emailfunctions = require("../functions/email");


// expose this function to our app using module.exports
module.exports = function (app, passport, manager, hashids) {

    app.post('/events/list', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var promises = [];
        var outputevents = [];


        new Promise(function (resolve, reject) {
            // I want to only provide 1 week of notifications or 50 notifications
            // But this is the only way to see your friend request, so we need to return
            // even old or buried notifications
            var sinceLastWeek = { $gt: new Date() - 1000 * 3600 * 24 * 365  };
            var findFilter = req.body.since
                ? { userid: req.session.userid, timestamp: sinceLastWeek, _id: { $gt: hashids.decodeHex(req.body.since) } }
                : { userid: req.session.userid, timestamp: sinceLastWeek };

            EventModel.find(findFilter).sort({ '_id': 'desc' }).cursor()
                .on('data', function (event) {
                    var formdata = {};
                    var commdata = {};
                    var decryptedId = "";
                    var fromUserId = "";
                    var eventdata = {
                        type: event.type,
                        message: event.message,
                        data: event.data,
                        id: hashids.encodeHex(event._id),
                        seen: event.seen,
                        timestamp: event.timestamp
                    };

                    // If a notification is invalid (references a deleted user, etc.) just delete it
                    // Otherwise when we load n notifications, we could be loading a bunch of invalid ones
                    var deleteInvalidNotification = function () {
                        console.log("Deleting invalid notification", event);
                        EventModel.remove({ '_id': event._id }, function (err, res) {});
                    };

                    if (typeof event.data === 'string') {
                        decryptedId = hashids.decodeHex(event.data);
                    }


                    promises.push(new Promise(function (resolve, reject) {
                        if (event.fromuser !== null) {

                            if (typeof event.data === 'string') {
                                decryptedId = hashids.decodeHex(event.data);
                            }

                            if (event.fromuser === "anonymous") {
                                eventdata.fromuser = {
                                    fb: null,
                                    pic: null,
                                    gender: null,
                                    name: "Anonymous",
                                };

                                PostModel.findById(decryptedId, function (err, formInfo) {
                                    //console.log(formInfo);
                                    if (err) {
                                        reject(err)
                                    } if (formInfo) {
                                        eventdata.qTitle = formInfo.questions[0].body;
                                        outputevents.push(eventdata);
                                        resolve();
                                    } else {
                                        resolve();                                        
                                    }
                                });

                            } else {
                                // this is default case
                                UserModel.findById(event.fromuser, function (err, userinfo) {
                                    if (err) {
                                        reject(err);
                                    } else {

                                        if (!userinfo) {
                                            deleteInvalidNotification();
                                            resolve();
                                        }
                                        
                                        // eventdata.fromuser = {
                                        //     fb: userinfo.facebookID,
                                        //     pic: userinfo.pic,
                                        //     gender: userinfo.gender,
                                        //     name: userinfo.name.first + " " + userinfo.name.last,
                                        // };

                                        if (userinfo) {
                                            eventdata.fromuser = {
                                                fb: userinfo.facebookID,
                                                pic: userinfo.pic,
                                                gender: userinfo.gender,
                                                name: userinfo.name.first + " " + userinfo.name.last,
                                            };
                                        }

                                        if (event.type === 'network') {
                                            eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                            outputevents.push(eventdata);
                                            resolve();
                                            return;
                                        }

                                        if (event.type === "form" || event.type === "form-answer" || event.type === "form-discussion") {

                                            if (event.type === "form-discussion" || (event.type === "form" && event.data.groupid) ) decryptedId = hashids.decodeHex(event.data.formid);
                                            PostModel.findById(decryptedId, function (err, formInfo) {
                                                if (err) {
                                                    reject();
                                                } else if (formInfo) {
                                                    if (formInfo.type === 'survey') {
                                                        eventdata.qTitle = formInfo.questions[0].body;
                                                    } else {
                                                        eventdata.qTitle = formInfo.description;
                                                    }
                                                    eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                    outputevents.push(eventdata);
                                                    resolve();
                                                } else {
                                                    deleteInvalidNotification();
                                                    resolve();
                                                };
                                            });
                                        } else if (event.type === "comm" || event.type === "comm-admin" || event.type === "comm-request") {
                                            GroupModel.findById(decryptedId, function (err, commInfo) {
                                                if (err) {
                                                    reject();
                                                } else if (commInfo) {
                                                    eventdata.commTitle = commInfo.title;
                                                    eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                    outputevents.push(eventdata);
                                                    resolve();
                                                } else {
                                                    deleteInvalidNotification();
                                                    resolve();
                                                }
                                            });
                                        } else if (event.type == "form-shared") {
                                            // **Delete this once database is wiped **
                                            if (typeof event.data == "string") {
                                                let decryptedForm = hashids.decodeHex(event.data);
                                                PostModel.findById(decryptedForm, function (err, formInfo) {
                                                    if (err) {
                                                        reject(err);
                                                    } else if (formInfo) {
                                                        if (formInfo.type === 'survey') {
                                                            eventdata.qTitle = formInfo.questions[0].body;
                                                        } else {
                                                            eventdata.qTitle = formInfo.description;
                                                        }
                                                        eventdata.commTitle = "Legacy Notification";
                                                        eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                        outputevents.push(eventdata);
                                                        resolve();
                                                    } else {
                                                        deleteInvalidNotification();
                                                        resolve();
                                                    };
                                                });
                                            } else {
                                                let decryptedCom = hashids.decodeHex(event.data.commid)
                                                let decryptedForm = hashids.decodeHex(event.data.formid);

                                                PostModel.findById(decryptedForm, function (err, formInfo) {
                                                    //console.log(formInfo);
                                                    if (err) {

                                                        reject(err);
                                                    } else if (formInfo) {
                                                        GroupModel.findById(decryptedCom, function (err2, commInfo) {
                                                            if (err2) {
                                                                reject();
                                                            } else if (commInfo) {
                                                                eventdata.qTitle = formInfo.questions[0].body;
                                                                eventdata.commTitle = commInfo.title;
                                                                eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                                outputevents.push(eventdata);

                                                                resolve();
                                                            } else {
                                                                deleteInvalidNotification();
                                                                resolve();
                                                            }
                                                        });
                                                    } else {
                                                        deleteInvalidNotification();
                                                        resolve();
                                                    }
                                                });
                                            }
                                        } else {
                                            deleteInvalidNotification();
                                            resolve();
                                        }

                                    }
                                });
                            }
                        } else {
                            outputevents.push(eventdata);
                            resolve();
                        }
                    })  
                    .then(function() {})
                    .catch(function () {})
                );
                })
                .on('error', function (err) {
                    // handle error
                    reject();
                })
                .on('end', function () {
                    // final callback
                    resolve();
                });
        }).then(function () {
            Promise.all(promises).then(function () {
                var sortedEvents = outputevents.sort(function (a, b) {
                    return a.timestamp > b.timestamp;
                });
                res.json({
                    status: 1,
                    events: sortedEvents,
                    newestEvent: sortedEvents.length > 0
                        ? sortedEvents[sortedEvents.length - 1].id
                        : null,
                    isFullList: !req.body.since // are we returning all the notifications?
                });
            }).catch(function (err) {
                res.json({ status: 0 });
            });
        })
            .catch(function () {
                res.json({ status: 0 });
            })
    });

    app.post('/events/seen', manager.ensureLoggedIn('/users/login'), function (req, res) {
        // event id
        var eventid = hashids.decodeHex(req.body.id);
        // update logs
        EventModel.findOneAndUpdate({ _id: eventid, userid: req.session.userid }, { $set: { seen: true } }, function (err, k) {
            if (err) {
                res.json({ status: 0 });
            } else {
                res.json({ status: 1 });
            }
        });
    });

    app.post('/events/markAllRead', manager.ensureLoggedIn('/users/login'), function (req, res) {
        // event id
        var eventid = hashids.decodeHex(req.body.id);

        var criteria = {
            userid: req.session.userid
        }
        EventModel.update(criteria, { seen: true }, { multi: true }, function (err) {
            if (err) {
                res.json({ status: 0 });
            } else {
                res.json({ status: 1 });
            }
        });
    });

    app.post('/events/delete', manager.ensureLoggedIn('/users/login'), function (req, res) {
        // event id
        var eventid = hashids.decodeHex(req.body.id);
        // update logs
        EventModel.remove({ _id: eventid, userid: req.session.userid }, function (err, k) {
            if (err) {
                res.json({ status: 0 });
            } else {
                res.json({ status: 1 });
            }
        });
    });


    // app.post('/events/sendfix', function (req, res) {
    //     emailfunctions.sendFix();

    //     res.json({status: 1});
    // });

};