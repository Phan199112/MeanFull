var DiscussionModel = require('../db.models/discussion.model');
var FormModel = require('../db.models/form.model');
var UserModel = require('../db.models/user.model');
var EmailStoreModel = require('../db.models/emailStore.model');
var log = require("../functions/logs");
var emailfunctions 	= require("../functions/email");
var notifications = require("../functions/notifications");
var usersfunctions = require('../functions/users');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // save a new community
    app.post('/discussions/new', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData =  req.body;
        var pc = receivedData.previousCommenters;

        // mongodb
        DiscussionModel.create({userid: req.session.userid, formid: hashids.decodeHex(receivedData.formid),
            message: receivedData.message, timestamp: Date.now()}, function(err, k) {
            if (err) {
                // failed to save the message
                res.json({status: 0});

            } else {
                // so the discussion note was saved
                // now inform author of form
                console.log("Entering discussion route call with data: (req.body)", receivedData);


                var authorid = null;
                var formid = hashids.decodeHex(receivedData.formid);
                var firstquestion;
                var questionLink = `https://www.questionsly.com/feed;survey=${receivedData.formid}`;

                return new Promise(function(resolve, reject) {
                    FormModel.findById(formid, function (err, form) {
                        if (err) {
                            reject(err);
                        } else {
                            if (form) {
                                // look up the author of the form
                                authorid = form.userid;
                                firstquestion = form.questions[0].body;
                            }
                            resolve();
                        }
                    });

                })
                    .then(function() {
                        // log
                        log.writeLog(req.session.userid, 'discussion message created', req.ip);

                        // update user stats
                        usersfunctions.incrementNoDiscussion(req.session.userid);

                        // user found?
                        if (authorid !== null) {
                            // insite notification
                            notifications.createNotification(authorid, req.session.userid, "form-discussion", "New comment", {
                                formid: receivedData.formid,
                                messageid: hashids.encodeHex(k._id)
                            });

                            // email notification
                            // check the notification settings of this user
                            UserModel.findById(authorid, function(err, authr) {
                                if (err) {
                                    // no email
                                    res.json({status: 1});

                                } else {
                                    if (authr) {


                                        UserModel.findById(req.session.userid, function (err, sndr) {
                                            if (err) {
                                                // no email
                                                res.json({ status: 1 });

                                            } else {
                                                new Promise(function (resolve, reject) {
                                                    EmailStoreModel.findOne({ userid: authorid }, function (err, e) {
                                                        if (err) {
                                                            console.log("Error fetching emailstore in discussion");
                                                            reject();
                                                        }

                                                        UserModel.findById(authorid, function (err, me) {
                                                            if (err) {
                                                                console.log("Error fetching user!");
                                                                reject();
                                                            } else {

                                                                if (e) {
                                                                    var questionNotifications = e.questions;
                                                                    var qInd = questionNotifications.findIndex(q => q.formid === formid);
                                                                    if (qInd != -1) {
                                                                        questionNotifications[qInd].commentCount += 1;
                                                                    } else {
                                                                        questionNotifications.push({formid: formid, question: firstquestion, commentCount: 1, responseCount: 0, link: questionLink});
                                                                    }

                                                                    e.save(function (err) {
                                                                        if (err) {
                                                                            console.log("Problem pushing discussion update to email store");
                                                                        }
                                                                    });
                                                                    resolve();

                                                                } else {
                                                                    EmailStoreModel.create({
                                                                        userid: authorid,
                                                                        questions: [{ formid: formid, question: firstquestion, commentCount: 1, responseCount: 0, link: questionLink }],
                                                                        community: [],
                                                                        network: [],
                                                                        shared: []  
                                                                    }, function (err, k) {
                                                                        if (err) {
                                                                            console.log("Failed to create emailstore object");
                                                                            reject();
                                                                        } else {
                                                                            resolve();
                                                                        }
                                                                    });
                                                                }

                                                            }
                                                        });
                                                    });
                                                }).catch(err => {
                                                    console.log("emailstore discussion promise rejected");
                                                });

                                                res.json({status: 1});




                                                // send
                                                // if (Object.keys(authr.notifications).length === 0) {
                                                //     if (authr.notifications.discussion === true) {
                                                //         emailfunctions.sendNotificationDiscussion(authr.email, sndr, receivedData.formid, receivedData.firstquestion);

                                                //         if (pc.length > 0) {
                                                //             for (let z=0; z < pc.length; z++) {
                                                //                 UserModel.findById(hashids.decodeHex(pc[z]), function (err, o) {
                                                //                     if (err) {
                                                //                         // no email
                                                //                         res.json({ status: 1 });
                                                //                     } else {
                                                //                         emailfunctions.sendNotificationDiscussionFollowUp(o.email, sndr, authr, receivedData.firstquestion, receivedData.formid);
                                                //                     }
                                                //                 });
                                                //             }
                                                //         }

                                                //         res.json({status: 1});
                                                //     } else {
                                                //         // no email
                                                //         res.json({status: 1});
                                                //     }
                                                // } else {
                                                //     // if no settings are recorded, emails should be send as this is default policity as signup as well
                                                //     emailfunctions.sendNotificationDiscussion(authr.email, sndr, receivedData.formid, receivedData.firstquestion);

                                                //     if (pc.length > 0) {
                                                //         for (let z = 0; z < pc.length; z++) {
                                                //             UserModel.findById(hashids.decodeHex(pc[z]), function (err, o) {
                                                //                 if (err) {
                                                //                     // no email
                                                //                 } else {
                                                //                     emailfunctions.sendNotificationDiscussionFollowUp(o.email, sndr, authr, receivedData.firstquestion, receivedData.formid);
                                                //                 }
                                                //             });
                                                //         }
                                                //     }

                                                //     res.json({status: 1});
                                                // }
                                            }
                                        });

                                    } else {
                                        //no user found
                                        res.json({status: 1});
                                    }

                                }
                            });
                        } else {
                            // no email though
                            res.json({status: 1});
                        }
                    })
                    .catch(function () {
                        // no email though
                        res.json({status: 1});
                    });

            }
        });
    });

    app.post('/discussions/delete', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var formid = hashids.decodeHex(req.body.id);
        //
        DiscussionModel.remove({_id: formid, userid: req.session.userid}, function(err) {
            if (!err) {
                log.writeLog(req.session.userid, 'discussion message deleted', req.ip);
                res.json({status: 1});
            } else {
                res.json({status: 0});
            }
        });
        // Update users stats
        usersfunctions.decrementNoDiscussion(req.session.userid);
    });

    app.post('/discussions/list', manager.ensureLoggedIn('/users/login'), function (req, res, next) {
        // search comments by formid
        var formid = hashids.decodeHex(req.body.formid);

        // variables
        var messages = [];
        var authorstemp = [];
        var authorprofiles = [];
        var authorprofilespromise = [];
        var messagesoutput = [];

        return new Promise(function(resolve, reject){
            DiscussionModel.find({formid: formid}).sort({'timestamp': 'asc'}).cursor()
                .on('data', function(message){
                    // was the form generated by the current user?
                    var adminrights = false;
                    if (req.isAuthenticated()) {
                        if (req.session.userid == message.userid) {
                            // yes
                            adminrights = true;
                        }
                    }
                    // prepare the data
                    messages.push({timestamp: message.timestamp, message: message.message, userid: message.userid, id: hashids.encodeHex(message._id), admin: adminrights});
                    authorstemp.push({authorid: message.userid})
                })
                .on('error', function(err){
                    reject(err);
                })
                .on('end', function(){
                    resolve();
                });
        })
            .then(function () {
                var tempfunction = function(x) {
                    return new Promise(function(resolve, reject){
                        UserModel.findById(x.authorid, function (err, k) {
                            if (err) {
                                reject(err);
                            } else {
                                if (k) {
                                    authorprofiles[k._id] = {
                                        name: k.name.first+' '+k.name.last,
                                        fb: k.facebookID,
                                        pic: k.pic,
                                        gender: k.gender,
                                        id: hashids.encodeHex(k._id)
                                    };
                                }
                                resolve();
                            }
                        });
                    });
                };

                authorstemp.forEach(function(author) {
                    authorprofilespromise.push(tempfunction(author));
                });

                return Promise.all(authorprofilespromise).then(function () {
                    //console.log("promise all completed");
                });

        })
            .then(function () {
                // merge the data
                for (l = 0; l < messages.length; l++) {
                    messagesoutput[l] = {timestamp: messages[l].timestamp, message: messages[l].message, author: authorprofiles[messages[l].userid], id: messages[l].id, admin: messages[l].admin};
                }
            })
            .then(function () {
                res.json({
                    status: 1,
                    data: messagesoutput
                });
            })
            .catch(function() {
                res.json({
                    status: 0
                });
            });

    });

};
