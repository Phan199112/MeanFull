var EventModel = require('../db.models/event.model');
var UserModel = require('../db.models/user.model');
var CommunityModel = require('../db.models/community.model');
var FormModel = require('../db.models/form.model');

// expose this function to our app using module.exports
module.exports = function (app, passport, manager, hashids) {

    app.get('/events/list', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var promises = [];
        var outputevents = [];


        new Promise(function (resolve, reject) {
            EventModel.find({ userid: req.session.userid }).cursor()
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

                                FormModel.findById(decryptedId, function (err, formInfo) {
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
                                        eventdata.fromuser = {
                                            fb: userinfo.facebookID,
                                            pic: userinfo.pic,
                                            gender: userinfo.gender,
                                            name: userinfo.name.first + " " + userinfo.name.last,
                                        };

                                        if (event.type === 'network') {
                                            eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                            outputevents.push(eventdata);
                                            resolve();
                                        }

                                        if (event.type === "form" || event.type === "form-answer" || event.type === "form-discussion") {

                                            if (event.type === "form-discussion") decryptedId = hashids.decodeHex(event.data.formid);
                                            FormModel.findById(decryptedId, function (err, formInfo) {
                                                if (err) {
                                                    reject();
                                                } else if (formInfo) {
                                                    eventdata.qTitle = formInfo.questions[0].body;
                                                    eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                    outputevents.push(eventdata);
                                                    resolve();
                                                } else {
                                                    resolve();
                                                };
                                            });
                                        } else if (event.type === "comm" || event.type === "comm-admin" || event.type === "comm-request") {
                                            CommunityModel.findById(decryptedId, function (err, commInfo) {
                                                if (err) {
                                                    reject();
                                                } else if (commInfo) {
                                                    eventdata.commTitle = commInfo.title;
                                                    eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                    outputevents.push(eventdata);
                                                    resolve();
                                                } else {
                                                    resolve();
                                                }
                                            });
                                        } else if (event.type == "form-shared") {
                                            // **Delete this once database is wiped **
                                            if (typeof event.data == "string") {
                                                let decryptedForm = hashids.decodeHex(event.data);
                                                FormModel.findById(decryptedForm, function (err, formInfo) {
                                                    if (err) {
                                                        reject(err);
                                                    } else if (formInfo) {
                                                        eventdata.commTitle = "Legacy Notification";
                                                        eventdata.qTitle = formInfo.questions[0].body;
                                                        eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                        outputevents.push(eventdata);
                                                        resolve();
                                                    } else {
                                                        resolve();
                                                    };
                                                });
                                            } else {
                                                let decryptedCom = hashids.decodeHex(event.data.commid)
                                                let decryptedForm = hashids.decodeHex(event.data.formid);

                                                FormModel.findById(decryptedForm, function (err, formInfo) {
                                                    //console.log(formInfo);
                                                    if (err) {

                                                        reject(err);
                                                    } else if (formInfo) {
                                                        CommunityModel.findById(decryptedCom, function (err2, commInfo) {
                                                            if (err2) {
                                                                reject();
                                                            } else if (commInfo) {
                                                                eventdata.qTitle = formInfo.questions[0].body;
                                                                eventdata.commTitle = commInfo.title;
                                                                eventdata.fromUserId = hashids.encodeHex(event.fromuser);
                                                                outputevents.push(eventdata);

                                                                resolve();
                                                            } else {
                                                                resolve();
                                                            }
                                                        });
                                                    } else {
                                                        resolve();
                                                    }
                                                });
                                            }
                                        } else {
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
                res.json({
                    status: 1, events: outputevents.sort(function (a, b) {
                        return a.timestamp > b.timestamp;
                    })
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

};