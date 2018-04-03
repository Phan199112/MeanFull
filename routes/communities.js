var CommunityModel = require('../db.models/community.model');
var UserModel = require('../db.models/user.model');
var FormModel = require('../db.models/form.model');
var math = require("../functions/math");
var log = require("../functions/logs");
var networkfunctions = require('../functions/network');
var usersfunctions = require('../functions/users');
var notifications = require("../functions/notifications");
var commfunctions = require('../functions/communities');
var formfunctions = require('../functions/forms');
var emailfunctions 	= require("../functions/email");

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // save a new community
    app.post('/community/save', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData =  req.body;
        var unhashedAdmins = [];

        if (receivedData.admins != null) {
            for (var i = 0; i < receivedData.admins.length; i++) {
                // save value
                unhashedAdmins.push(hashids.decodeHex(receivedData.admins[i]));
            }
        }

        // mongodb
        CommunityModel.create({adminuserid: [req.session.userid],
            title: receivedData.title,
            hashtags: receivedData.hashtags,
            public: receivedData.public,
            pic: receivedData.pic,
            description: receivedData.description,
            timestamp: Date.now()}, function(err, k) {
                if (err) {
                    res.json({status: 0});
                } else {
                    // write notifictions
                    if (unhashedAdmins != null) {
                        for (var i = 0; i < unhashedAdmins.length; i++) {
                            // notification
                            notifications.createNotification(unhashedAdmins[i], req.session.userid, "comm-admin", "Community invitation", hashids.encodeHex(k._id));
                            // send email
                            UserModel.findById(unhashedAdmins[i], function(err, l) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (Object.keys(l.notifications).length === 0) {
                                        if (l.notifications.commrequest === true) {
                                            emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                        }
                                    } else {
                                        // if no settings are recorded, emails should be send as this is default policity as signup as well
                                        emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                    }
                                }
                            });
                        }
                    }

                    // log
                    log.writeLog(req.session.userid, 'create community', req.ip);

                    // return
                    res.json({status: 1, id: hashids.encodeHex(k._id)});
                }
        });
    });


    app.put('/community/update', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData = req.body;
        console.log("Received:", receivedData);
        var unhashedAdmins = [];
        var decrypted = hashids.decodeHex(receivedData.commid);
        console.log("Decrypted id:", decrypted);


        var newtitle = receivedData.title;
        var newpublic = receivedData.public;
        var newpic = receivedData.pic;
        var newdescription = receivedData.description;
        
        if (receivedData.admins != null) {
            for (var i = 0; i < receivedData.admins.length; i++) {
                // save value
                unhashedAdmins.push(hashids.decodeHex(receivedData.admins[i]));
            }
        }


        CommunityModel.findOneAndUpdate({_id: decrypted}, {$set: {title: newtitle, description: newdescription, public: newpublic, pic: newpic}}, {new: true}, function (err, doc) {
            if (err) {
                console.log("Error updating community: ", err);
                res.json({ status: 0 });
            } else {
                
                // new admin notifictions
                if (unhashedAdmins != null  && unhashedAdmins.length != 0) {
                    for (var i = 0; i < unhashedAdmins.length; i++) {
                        // notification
                        notifications.createNotification(unhashedAdmins[i], req.session.userid, "comm-admin", "Community invitation", hashids.encodeHex(doc._id));
                        // send email
                        UserModel.findById(unhashedAdmins[i], function(err, l) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (Object.keys(l.notifications).length === 0) {
                                    if (l.notifications.commrequest === true) {
                                        emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                    }
                                } else {
                                    // if no settings are recorded, emails should be send as this is default policity as signup as well
                                    emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                }
                            }
                        });
                    }
                }

                // log
                log.writeLog(req.session.userid, 'update community', req.ip);

                // return
                res.json({ status: 1, id: hashids.encodeHex(doc._id) });
            }
        });

    });


    app.post('/community/invite', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var commid = hashids.decodeHex(req.body.commid);
        var commtitle = req.body.commtitle;
        var commpic = req.body.commpic;

        commfunctions.commAdmin(commid, req.session.userid).then(function(result) {
            if (result === true) {
                // the current user is an admin
                req.body.userids.forEach(function(userid) {
                    var seluserid = hashids.decodeHex(userid);
                    var sender = "";
                    notifications.createNotification(seluserid, req.session.userid, "comm", "Community invitation", req.body.commid);
                    
                    
                    // send email
                    UserModel.findById(seluserid, function(err, l) {
                        if (err) {
                            console.log(err);
                        } else {

                            UserModel.findById(req.session.userid, function (err, s) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    sender = s.name.first + " " + s.name.last;
                                 }
                            });


                            if (Object.keys(l.notifications).length === 0) {
                                if (l.notifications.commrequest === true) {
                                    emailfunctions.sendNotificationCommRequest(l.email, sender, commtitle, commpic);
                                }
                            } else {
                                // if no settings are recorded, emails should be send as this is default policity as signup as well
                                emailfunctions.sendNotificationCommRequest(l.email, sender, commtitle, commpic);
                            }
                        }
                    });






                });
                res.json({status: 1});
            } else {
                console.log("not an admin");
                res.json({status: 0});
            }
        })
            .catch(function(error) {
                console.log(error);
                res.json({status: 0});
            });
    });


    // retrieve a community
    app.get('/community/retrieve/:id', function(req, res) {

        var decrypted = hashids.decodeHex(req.params.id);
        console.log(decrypted);

        // mongoDB findByID
        CommunityModel.findById(decrypted, function (err, comm) {
            if (err) {
                res.json({status: 0});
            } else {
                if (comm !== null) {
                    // determine whether the current user is a member
                    var ismember = true;
                    var isadmin = false;

                    if (comm.members.indexOf(req.session.userid) === -1 && comm.adminuserid.indexOf(req.session.userid) === -1 ) {
                        ismember = false;
                    }

                    if (comm.adminuserid.indexOf(req.session.userid) !== -1 ) {
                        isadmin = true;
                    }

                    var memberlisttemp = [];
                    var randomints = [];
                    var networkpromise = [];
                    var memberlist = [];

                    if (comm.members !== null) {
                        for (l=0; l < Math.min(5,comm.members.length); l++) {
                            var newval = math.getRandomInt(0, comm.members.length);
                            if (randomints.indexOf(newval) === -1) {
                                randomints.push(newval);
                            }
                        }

                        // add some random members
                        for (j in randomints) {
                            memberlisttemp.push(comm.members[j]);
                        }

                        // add the admins
                        for (k=0; k < comm.adminuserid.length; k++) {
                            memberlisttemp.push(comm.adminuserid[k]);
                        }
                    }

                    //console.log("temp list ",memberlisttemp);

                    // query username and link of the person's network
                    var tempfunctionnetwork = function(x) {
                        var promise = new Promise(function(resolve, reject){
                            UserModel.findById(x, function (err, user) {
                                if (err) {
                                    reject(err);
                                } else {
                                    var tempa, tempb;

                                    // deal with picture
                                    if (user.facebookID !== null) {
                                        tempa = "fb";
                                        tempb = user.facebookID;
                                    } else {
                                        if (user.pic != null) {
                                            tempa = "local";
                                            tempb = user.pic;
                                        } else {
                                            tempa = "default";
                                            tempb = user.gender;
                                        }
                                    }

                                    memberlist.push({name: user.name, pic: [tempa, tempb], link: hashids.encodeHex(user._id)});
                                    resolve();
                                }
                            });
                        }).catch(function () {
                            console.log("error network data");
                        });
                        return promise;
                    };

                    memberlisttemp.forEach(function(id) {
                        networkpromise.push(tempfunctionnetwork(id));
                    });

                    return Promise.all(networkpromise).then(function () {
                        console.log("promise all completed interim (network)");
                        var sendcomm;
                        // public status
                        if (comm.public === true) {
                            // send back data
                            sendcomm = {title: comm.title, timestamp: comm.timestamp, public: comm.public, description: comm.description, pic: comm.pic, ismember: ismember, isadmin: isadmin, members: memberlist};
                            res.json({status: 1, data: sendcomm, loggedin: req.isAuthenticated() ? '1' : '0'});

                        } else {
                            if (ismember === true) {
                                // send back data
                                sendcomm = {title: comm.title, timestamp: comm.timestamp, public: comm.public, description: comm.description, pic: comm.pic, ismember: ismember, isadmin: isadmin, members: memberlist};
                                res.json({status: 1, data: sendcomm, loggedin: req.isAuthenticated() ? '1' : '0'});

                            } else {
                                // send back data
                                sendcomm = {title: comm.title, timestamp: comm.timestamp, public: comm.public, description: comm.description, pic: comm.pic, ismember: ismember, isadmin: isadmin, members: null};
                                res.json({status: 2, data: sendcomm, loggedin: req.isAuthenticated() ? '1' : '0'});
                            }
                        }
                    });


                } else {
                    res.json({status: 0});
                }
            }
        });
    });

    // list for sharing to community feed
    app.get('/community/mylist', manager.ensureLoggedIn('/users/login'), function (req, res) {
        // get the communities for which req.session.userid is a member
        var communitiesdata = [];

        return new Promise(function (resolve, reject) {
                CommunityModel.find({
                    $or: [{'adminuserid': req.session.userid}, {'members': req.session.userid}]
                }).limit(20).cursor()
                    .on('data', function (comm) {
                        communitiesdata.push({
                            title: comm.title,
                            pic: comm.pic,
                            id: hashids.encodeHex(comm._id)
                            //window.console.log("")
                        });
                    })
                    .on('error', function (err) {
                        // handle error
                        reject(err);
                    })
                    .on('end', function () {
                        // final callback
                        resolve();
                    });
            })
                .then(function () {
                    //
                    res.json({status: 1, data: communitiesdata})

                })
                .catch(function () {
                    res.json({status: 0});
                });
    });

    // list for feed
    app.post('/community/list', function (req, res) {
        // variables
        var selecteduser;
        var loggedin = false;
        var communitiesdata = [];
        var communitiesdatatemp = [];

        if (req.body.user == null) {
            selecteduser = null;
        } else {
            selecteduser = hashids.decodeHex(req.body.user);
        }

        if (req.isAuthenticated()) {
            loggedin = true;
        } else {
            loggedin = false;
        }

        if (selecteduser == null) {
            // mongoDB query
            new Promise(function(resolve, reject) {
                CommunityModel.find({public: true}).limit(100).exec(function (err, k) {
                    if (err) {
                        reject(err);
                    } else {
                        if (k != null) {
                            if (k.length <= 9) {
                                for (i=0; i<k.length; i++) {
                                    var current = k[i];
                                    communitiesdata.push({title: current.title, id: hashids.encodeHex(current._id), pic: current.pic});
                                }

                            } else {
                                // get some random communities
                                var randomints = [];

                                while (randomints.length != 9) {
                                    var newval = math.getRandomInt(0, k.length);
                                    if (randomints.indexOf(newval) === -1) {
                                        randomints.push(newval);
                                    }
                                }
                                // add some random members
                                for (j in randomints) {
                                    var current = k[j];
                                    communitiesdata.push({title: current.title, id: hashids.encodeHex(current._id), pic: current.pic});
                                }

                            }
                        }
                        resolve();
                    }
                })
            })
                .then(function () {
                    res.json({
                        status: 1,
                        data: communitiesdata,
                        random: null,
                        loggedin: loggedin
                    });
                })
                .catch(function() {
                    // failed
                    res.json({
                        status: 0
                    });
                });

        } else {
            // generate the communitites associated to a user and some random ones for discovery

            //the output will depend on whether or not the profile of this user is public and whether or not the users are connected
            new Promise(function(resolve, reject) {
                if (selecteduser === req.session.userid) {
                    // it's me
                    resolve();
                } else {
                    usersfunctions.profilePublic(selecteduser).then(function (result) {
                        if (result === true) {
                            resolve();
                        } else {
                            networkfunctions.areConnected(selecteduser, req.session.userid).then(function (result) {
                                if (result === true) {
                                    resolve();
                                } else {
                                    reject();
                                }
                            })
                                .catch(function () {
                                    reject();
                                });
                        }
                    })
                        .catch(function () {
                            reject();
                        });

                }

            })
                .then(function() {
                    //
                    //
                    var promiseslist = [];
                    var limitrecords = 4;
                    var randomcomm = [];

                    // get four random communities
                    var randomCommunities = function () {
                        var promise = new Promise(function (resolve, reject) {
                            // determine whether the profile the loggon user is visiting is already part of his/her network
                            CommunityModel.findRandom().limit(limitrecords).exec(function (err, songs) {
                                for (l=0; l < songs.length; l++) {
                                    randomcomm.push({
                                        title: songs[l].title,
                                        id: hashids.encodeHex(songs[l]._id),
                                        pic: songs[l].pic
                                    });
                                }
                                // done
                                resolve();
                            });
                        })
                            .catch(function () {
                                console.log("failed to get some random communitities");
                            });
                        return promise;
                    };

                    var userCommunities = function () {
                        var promise = new Promise(function (resolve, reject) {
                            CommunityModel.find({
                                $or: [{'adminuserid': selecteduser}, {'members': selecteduser}]
                            }).limit(10).cursor()
                                .on('data', function (comm) {
                                    communitiesdatatemp.push({
                                        title: comm.title,
                                        id: hashids.encodeHex(comm._id),
                                        pic: comm.pic
                                    });
                                })
                                .on('error', function (err) {
                                    // handle error
                                    console.log("Error in reading feed " + err);
                                    reject(err);
                                })
                                .on('end', function () {
                                    // final callback
                                    // send data back
                                    resolve();
                                });
                        })
                            .then(function () {
                                //
                                if (communitiesdatatemp != null) {
                                    if (communitiesdatatemp.length <= 9) {
                                        // do nothing all is good
                                        communitiesdata = communitiesdatatemp;

                                    } else {
                                        // get some random communities
                                        var randomints = [];

                                        while (randomints.length != 9) {
                                            var newval = math.getRandomInt(0, communitiesdatatemp.length);
                                            if (randomints.indexOf(newval) === -1) {
                                                randomints.push(newval);
                                            }
                                        }
                                        // add some random members
                                        for (j in randomints) {
                                            communitiesdata.push(communitiesdatatemp[j]);
                                        }

                                    }
                                }
                            })
                            .catch(function () {
                                console.log("failed to get some user communitities");
                            });
                        return promise;
                    };

                    // push promises to array
                    promiseslist.push(randomCommunities());
                    promiseslist.push(userCommunities());

                    return Promise.all(promiseslist).then(function () {
                        console.log("promise all completed");
                        res.json({
                            status: 1,
                            data: communitiesdata,
                            random: randomcomm,
                            loggedin: loggedin
                        });
                    })
                        .catch(function () {
                            // failed
                            res.json({status: 0});
                        });

                })
                .catch(function() {
                    // failed
                    res.json({status: 0});
                });
        }
    });


    // join a community
    app.post('/community/join', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var commid =  hashids.decodeHex(req.body.targetid);

        // one can only manually join if the community is public
        return new Promise(function(resolve, reject){
            // check whether the community is public
            commfunctions.commPublic(commid).then(function(result) {
                if (result === true) {
                    resolve();
                } else {
                    reject();
                }
            })
        })
            .then(function() {
                // mongodb update the database entry
                CommunityModel.findByIdAndUpdate(commid, {$push: {members: req.session.userid}}, function(err, k) {
                    if (err) {
                        res.json({status: 0});
                    } else {
                        res.json({status: 1});
                    }
                });
            })
            .catch(function() {
                res.json({status: 0});
            });
    });

    // leave a community
    app.post('/community/leave', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData =  hashids.decodeHex(req.body.targetid);
        console.log("join network: ", receivedData);
        // mongodb
        CommunityModel.findByIdAndUpdate(receivedData, {$pull: {members: req.session.userid}}, function(err, k) {
            if (err) {
                res.json({status: 0});
            } else {
                res.json({status: 1});
            }
        });
    });

    app.post('/community/report', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetcommid = hashids.decodeHex(req.body.targetid);
        //
        CommunityModel.findByIdAndUpdate(targetcommid, {$set: {report: {set: true, by: req.session.userid, timestamp: Date.now()}}}, function(err, k) {
            if (err) {
                console.log("Error in reporting community"+err);
                res.json({status: 0});
            } else {
                console.log("Reported community");
                log.writeLog(req.session.userid, 'reported community', req.ip);
                res.json({status: 1});
            }
        });
    });

    app.post('/community/delete', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetcommid = hashids.decodeHex(req.body.targetid);
        //
        CommunityModel.remove({_id: targetcommid, adminuserid: req.session.userid}, function(err, k) {
            if (err) {
                console.log("Error in deleting community"+err);
                res.json({status: 0});
            } else {
                console.log("Deleting community");
                log.writeLog(req.session.userid, 'deleted community', req.ip);
                res.json({status: 1});
            }
        });
    });

    app.post('/community/shareform', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var commid = hashids.decodeHex(req.body.commid);
        var formid = hashids.decodeHex(req.body.formid);

        var notiData = {commid: req.body.commid, formid: req.body.formid};

        var emailaddresses = [];
        var commuserslist = [];

        // helper functions
        var getemailaddress = function (x) {
            return new Promise(function (resolve, reject) {
                UserModel.findById(x, function (err, l) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        // only send emails if the user allows it (notification setting)
                        if (Object.keys(l.notifications).length === 0) {
                            if (l.notifications.formrequest === true) {
                                emailaddresses.push(l.email);
                            }
                        } else {
                            // if no settings are recorded, emails should be send as this is default policity as signup as well
                            emailaddresses.push(l.email);
                        }
                        resolve();
                    }
                });
            });
        };

        var getuserscomm = function (x) {
            return new Promise(function (resolve, reject) {
                CommunityModel.findById(x, function (err, c) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (c.members !== null) {
                            for (l=0; l < c.members.length; l++) {
                                commuserslist.push(c.members[l]);
                            }

                        }
                        resolve();
                    }
                });
            });
        };

        var sharetocomm = function() {
            return new Promise(function (resolve, reject) {
                FormModel.findByIdAndUpdate({_id: formid}, {$push: {sharedWithCommunities: commid}}, function(err, k) {
                    if (err) {
                        reject(err);

                    } else {
                        log.writeLog(req.session.userid, 'shared form in community', req.ip);
                        resolve();
                    }
                });
            });
        };

        // information on the sender of the email
        // here it is never anonymous
        // sender information
        var sender = {};
        sender.name = {first: req.user.name.first, last: req.user.name.last, fb: req.user.fb, pic: req.user.pic};
        sender.insite = req.session.userid;

        // promises
        var promises = [];
        var promisesnotifications = [];


        // double check first to see whether this form is public, and if not whether the current user is the author
        new Promise(function (resolve, reject) {
            formfunctions.formPublic(formid).then(function(result) {
                if (result === true) {
                    // the form is public, so it can be shared
                    resolve();
                } else {
                    // is the user an admin
                    formfunctions.formAdmin(formid, req.session.userid).then(function(result) {
                        if (result === true) {
                            // user is the admin, sharing is ok
                            resolve();
                        } else {
                            reject();
                        }
                    }).catch(function() {
                        reject();
                    });
                }
            })
                .catch(function() {
                    reject();
                });

        })
            .then(function() {
                // share the form
                promises.push(sharetocomm());
                // get the users in the comm
                promises.push(getuserscomm(commid));

                // execute this promise list
                return Promise.all(promises).then(function () {
                    // execute promisses to retrieve the email addresses
                    if (commuserslist.length > 0) {
                        // in-site notifications
                        for (i=0; i < commuserslist.length; i++) {
                            notifications.createNotification(commuserslist[i], sender.insite, "form-shared", "Shared survey", notiData);
                        }

                        // retrieve email adresses
                        commuserslist.forEach(function(user) {
                            promisesnotifications.push(getemailaddress(user));
                        });

                    } else {
                        res.send({status: 1});
                    }

                    return Promise.all(promisesnotifications).then(function () {
                        if (emailaddresses.length > 0) {
                            // first check whether there are duplicates
                            var alreadyincluded = [];

                            // loop and check
                            for (l = 0; l < emailaddresses.length; l++) {
                                if (alreadyincluded.indexOf(emailaddresses[l]) === -1) {
                                    alreadyincluded.push(emailaddresses[l]);
                                    emailfunctions.sendNotificationFormRequest(emailaddresses[l], sender, hashids.encodeHex(formid));
                                }
                            }
                            //
                            res.send({status: 1});

                        } else {
                            res.send({status: 1});
                        }
                    })
                        .catch(function() {
                            res.send({status: 0});
                        });
                })
                    .catch(function() {
                        res.send({status: 0});
                    });


            })
            .catch(function() {
                res.json({status: 0});
            });

    });
};