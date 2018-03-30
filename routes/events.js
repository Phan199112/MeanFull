var EventModel = require('../db.models/event.model');
var UserModel = require('../db.models/user.model');
var CommunityModel = require('../db.models/community.model');
var FormModel = require('../db.models/form.model');

// expose this function to our app using module.exports
module.exports = function (app, passport, manager, hashids) {

    app.get('/events/list', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var promises = [];
        var outputevents = [];
        var formdata = {};
        var commdata = {};
        var decryptedId = "";



        new Promise(function (resolve, reject) {
            EventModel.find({ userid: req.session.userid }).cursor()
                .on('data', function (event) {
                    var eventdata = {
                        type: event.type,
                        message: event.message,
                        data: event.data,
                        id: hashids.encodeHex(event._id),
                        seen: event.seen,
                        timestamp: event.timestamp
                    };


                     console.log("An event:--------------", event, event._id);

                      decryptedId = hashids.decodeHex(event.data);

                     if (event.type === "form" || event.type === "form-shared" || event.type === "form-answer") {

                         FormModel.findById(decryptedId, function (err, formInfo) {
                             //console.log(formInfo);
                             if (err) {
                                 console.log("error occured in FormModel")
                             } else {

                                 if (formInfo) {
                                      console.log("formInfo", formInfo);
                                 } 
                                 if (formInfo !== null && formInfo.questions) {
                                     formdata.timestamp = formInfo.timestamp;
                                     formdata.question = formInfo.questions[0].body;//get the body again
                                 }
                             }

                         });
                     }

                    if (event.type === "comm" || event.type === "comm-admin") {
                        CommunityModel.findById(decryptedId, function (err, commInfo) {
                            if (err) {
                            } else {
                                commdata = {
                                    title: commInfo.title,
                                };
                            }
                        });
                    }


                    promises.push(new Promise(function (resolve, reject) {
                        if (event.fromuser !== null) {
                            if (event.fromuser === "anonymous") {
                                eventdata.fromuser = {
                                    fb: null,
                                    pic: null,
                                    gender: null,
                                    name: "Anonymous",
                                    qTitle: "someString"
                                    //qTitle: formdata.question
                                };
                                outputevents.push(eventdata);
                                resolve();

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
                                             qtitle: "someString"
                                        };
                                        eventdata.qTitle = formdata.question;
                                        eventdata.commTitle = commdata.title;
                                        outputevents.push(eventdata);
                                        resolve();
                                    }
                                });
                            }
                        } else {
                            outputevents.push(eventdata);
                            resolve();
                        }
                    }));
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
            }).catch(function () {
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