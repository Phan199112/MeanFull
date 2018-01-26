var DiscussionModel = require('../db.models/discussion.model');
var FormModel = require('../db.models/form.model');
var UserModel = require('../db.models/user.model');
var log = require("../functions/logs");
var emailfunctions 	= require("../functions/email");
var notifications = require("../functions/notifications");

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // save a new community
    app.post('/discussions/new', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData =  req.body;

        // mongodb
        DiscussionModel.create({userid: req.session.userid, formid: hashids.decodeHex(receivedData.formid),
            message: receivedData.message, timestamp: Date.now()}, function(err, k) {
            if (err) {
                // failed to save the message
                res.json({status: 0});

            } else {
                // so the discussion note was saved
                // now inform author of form

                var authorid = null;

                return new Promise(function(resolve, reject) {
                    FormModel.findById(hashids.decodeHex(receivedData.formid), function (err, form) {
                        if (err) {
                            reject(err);
                        } else {
                            if (form) {
                                // look up the author of the form
                                authorid = form.userid;
                            }
                            resolve();
                        }
                    });

                })
                    .then(function() {
                        // log
                        log.writeLog(req.session.userid, 'discussion message created', req.ip);

                        // user found?
                        if (authorid !== null) {
                            // insite notification
                            notifications.createNotification(authorid, req.session.userid, "form-discussion", "New comment", {
                                formid: receivedData.formid,
                                messageid: hashids.encodeHex(k._id)
                            });

                            // email notification
                            // check the notification settings of this user
                            UserModel.findById(authorid, function(err, l) {
                                if (err) {
                                    // no email
                                    res.json({status: 1});

                                } else {
                                    if (l) {
                                        // parameterization
                                        var sendername = '';
                                        if (req.user != null) {
                                            if (req.user.provider === "facebook") {
                                                sendername = req.user.displayName;
                                            } else {
                                                sendername = req.user.name.first+' '+req.user.name.last;
                                            }
                                        }

                                        // send
                                        if (Object.keys(l.notifications).length === 0) {
                                            if (l.notifications.discussion === true) {
                                                emailfunctions.sendNotificationDiscussion(l.email, req.user, receivedData.formid);
                                                res.json({status: 1});
                                            } else {
                                                // no email
                                                res.json({status: 1});
                                            }
                                        } else {
                                            // if no settings are recorded, emails should be send as this is default policity as signup as well
                                            emailfunctions.sendNotificationDiscussion(l.email, req.user, receivedData.formid);
                                            res.json({status: 1});
                                        }

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
                                authorprofiles[k._id] = {
                                    name: k.name.first+' '+k.name.last,
                                    fb: k.facebookID,
                                    pic: k.pic,
                                    gender: k.gender,
                                    id: hashids.encodeHex(k._id)
                                };
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