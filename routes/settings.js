var UserModel = require('../db.models/user.model');
var FormModel = require('../db.models/form.model');
var CommunityModel = require('../db.models/community.model');
var EventModel = require('../db.models/event.model');
var NetworkEdgesModel = require('../db.models/networkedges.model');
var randommod = require("../functions/random");
var commfunctions = require('../functions/communities');

var email 	= require("../node_modules/emailjs/email");
var server 	= email.server.connect({
    user:    "cw@arnebruyneel.be",
    password:"HCW-9yE-9Tz-keb",
    host:    "send.one.com",
    ssl:     true
});


// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    app.post('/users/pwdReset', function(req, res) {

        console.log("Password reset request");

        var userid;
        var newpassword = randommod.makeRandomPassword();
        var testuser = new UserModel();

        new Promise(function(resolve, reject) {
            UserModel.findOne({'local.email': req.body.email}, function (err, user) {
                console.log(user);
                if (err) {
                    console.log("error");
                    reject(err);
                } else {
                    if (user != null) {
                        userid = user._id;
                        resolve();
                    } else {
                        reject();
                    }
                }
            })
        })
            .then(function () {
                UserModel.findByIdAndUpdate(userid,
                    {$set: {"local.password": testuser.generateHash(newpassword)}}, function(err, k) {
                        if (err) {
                            console.log("Error in updating password"+err);
                        } else {
                            console.log("Updated password");

                            // send email
                            server.send({
                                text:    "new password: "+newpassword,
                                from:    "CrowdWorks Password Reset <cw@arnebruyneel.be>",
                                to:      "<"+req.body.email+">",
                                subject: "New password"
                            }, function(err, message) { console.log(err || message); });

                            res.json({
                                message: 'success',
                                data: 1
                            });
                        }
                    });

            })
            .catch(function () {
                console.log("failed");
                res.json({
                    message: 'failed',
                    data: 0
                });
            });
    });

    app.get('/users/settings/confirmemail/:id', function(req,res) {

        //
        console.log("email confirm request received"+req.params.id);
        //
        UserModel.findOneAndUpdate({'emailConfirmed.key': req.params.id}, {$set: {emailConfirmed: {value: true}}}, function(err, k) {
            if (err) {
                console.log("Error in confirming user"+err);
                res.json("Failure to update user account details.");
            } else {
                console.log("Confirmed user");
                res.json("User account verified, please login now.");
            }
        });
    });

    app.post('/users/settings/changepwd', manager.ensureLoggedIn('/users/login'), function(req, res) {
        // check if current password is identical to db password
        // if so overwrite current password
        // all is linked to the userid in the session
        // req.session.userid

        console.log("change pwd reached");

        var currentpwd = req.body.pwdsettings.current;
        var testuser = new UserModel();
        var newpwd = testuser.generateHash(req.body.pwdsettings.new);
        var pwdconfirmed = false; // boolean to assess whether the old passwords match

        new Promise(function(resolve, reject) {
            UserModel.findById(req.session.userid, function (err, user) {
                console.log(user);
                if (err) {
                    console.log("error");
                    reject(err);
                } else {
                    pwdconfirmed = user.validPassword(currentpwd);
                    console.log("old confirmed "+pwdconfirmed);
                    resolve();
                }
            })
        })
            .then(function () {
                if (pwdconfirmed) {
                    // momgoDB update
                    UserModel.findByIdAndUpdate(req.session.userid,
                        {$set: {"local.password": newpwd}}, function(err, k) {
                            if (err) {
                                console.log("Error in updating password"+err);
                            } else {
                                console.log("Updated password");
                                res.json({
                                    message: 'success',
                                    data: 1
                                });
                            }
                        });
                } else {
                    res.json({
                        message: 'success',
                        data: 0
                    });
                }
            });

    });

    app.put('/users/settings/changeprivacy', manager.ensureLoggedIn('/users/login'), function(req, res) {

        console.log("change privacy settings reached");
        console.log(req.body);

        UserModel.findByIdAndUpdate(req.session.userid,
            {$set: req.body}, function(err, k) {
                if (err) {
                    console.log("Error in updating privacy settings"+err);
                    res.json({status: 0});
                } else {
                    console.log("Updated privacy settings");
                    res.json({status: 1});
                }
            });
    });


    app.put('/users/settings/changesettings', manager.ensureLoggedIn('/users/login'), function(req, res) {

        console.log("change settings reached");
        console.log(req.body);
        var key = Object.keys(req.body);
        var value = req.body[key];
        console.log(key,value);

        if (key == 'name') {

            UserModel.findByIdAndUpdate(req.session.userid,
                {$set: {"name.first": value.first, "name.last": value.last, searchname: value.first+" "+value.last}}, function (err, k) {
                    if (err) {
                        console.log("Error in updating settings" + err);
                    } else {
                        console.log("Updated settings");
                        res.json({
                            data: 1
                        });
                    }
                });


        } else if (key == 'email') {
            // check whether somebody else already has the email address registered.

            // variables
            var userfound = 10; // set default to 'reject' value

            new Promise(function(resolve, reject) {
                UserModel.findOne({ $or:[ {"local.email": value}, {'email': value} ]}, function (err, k) {
                    if (err) {
                        reject(err);
                    } else {
                        if (k != null) {
                            userfound = 1;
                            resolve();

                        } else {
                            userfound = 0;
                            resolve();
                        }
                    }
                })
            })
                .then(function () {

                    if (userfound == 0) {

                        if (req.user.provider != "facebook") {
                            // edit in two locations if this a manual signup user

                            UserModel.findByIdAndUpdate(req.session.userid,
                                {$set: {"email": value, "local.email": value}}, function (err, k) {
                                    if (err) {
                                        console.log("Error in updating settings" + err);
                                    } else {
                                        console.log("Updated settings");
                                        res.json({
                                            data: 1
                                        });
                                    }
                                });
                        } else {

                            UserModel.findByIdAndUpdate(req.session.userid,
                                {$set: {"email": value}}, function (err, k) {
                                    if (err) {
                                        console.log("Error in updating settings" + err);
                                    } else {
                                        console.log("Updated settings");
                                        res.json({
                                            data: 1
                                        });
                                    }
                                });

                        }

                    } else {
                        console.log("Updated settings failed, email address already exists.");
                        res.json({
                            data: 0
                        });

                    }
                });

        } else {
            // edit in only one location
            UserModel.findByIdAndUpdate(req.session.userid,
                {$set: req.body}, function(err, k) {
                    if (err) {
                        console.log("Error in updating settings"+err);
                    } else {
                        console.log("Updated settings");
                        res.json({
                            data: 1
                        });
                    }
                });

        }

    });

    app.get('/users/settings/info', manager.ensureLoggedIn('/users/login'), function(req,res) {
        //
        var datauserinfo = {};
        var networkdatatemp = [];
        var networkpromise = [];
        var networkdata = [];
        var outputevents = [];
        var outputeventstemp = [];
        var eventdata = [];
        var eventpromises = [];

        new Promise(function(resolve, reject) {
            UserModel.findById(req.session.userid, function (err, userinfo) {
                if (err) {
                    reject();
                } else {
                    if (userinfo == null) {
                        reject();
                    } else {
                        datauserinfo = {gender: userinfo.gender, email: userinfo.email, name: userinfo.name,
                            dob: userinfo.dob, pic: userinfo.pic, facebookID: userinfo.facebookID,
                            location: userinfo.location, education: userinfo.education, public: userinfo.public};
                        resolve();
                    }
                }
            });
        })
            .then(function () {
                // for the notifications get the events data
                return new Promise(function(resolve, reject) {
                    EventModel.find({userid: req.session.userid}).sort({'timestamp': 'desc'}).cursor()
                        .on('data', function(event){
                            outputeventstemp.push({type: event.type, message: event.message, data: event.data, id: hashids.encodeHex(event._id), acted: event.acted, seen: event.seen, timestamp: event.timestamp});
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
                        // get some more info on these events: username and link to profile for a network request
                        // or the name of the survey and description if a survey
                        var tempfunction = function(x) {
                            console.log("tempf called");
                            return new Promise(function(resolve, reject){
                                if (x.type === "network") {
                                    var targetuserid;
                                    // x.data is the edge id
                                    return new Promise(function(resolve, reject) {
                                        NetworkEdgesModel.findById(hashids.decodeHex(x.data), function (err, edge) {
                                            if (err) {
                                                reject(err);
                                            } else {
                                                if (edge) {
                                                    if (edge.userid[0] !== req.session.userid) {
                                                        targetuserid = edge.userid[0];
                                                    } else {
                                                        targetuserid = edge.userid[1];
                                                    }
                                                }
                                                resolve();
                                            }
                                        });

                                    })
                                        .then(function() {
                                            UserModel.findById(targetuserid, function (err, userinfo) {
                                                if (err) {
                                                    reject();
                                                } else {
                                                    if (userinfo === null) {
                                                        eventdata[x.data] = {name: "Not found", link: null};
                                                    } else {
                                                        eventdata[x.data] = {name: userinfo.name.first+" "+userinfo.name.last, link: hashids.encodeHex(userinfo._id)};
                                                    }
                                                    resolve();
                                                }
                                            });
                                        })
                                        .catch(function() {
                                            eventdata[x.data] = {name: "Not found", link: null};
                                            resolve();
                                        });

                                } else if (x.type === "comm") {
                                    CommunityModel.findById(hashids.decodeHex(x.data), function (err, comm) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            if (comm) {
                                                eventdata[x.data] = {name: comm.title, link: hashids.encodeHex(comm._id)};
                                                resolve();

                                            } else {
                                                eventdata[x.data] = {name: "Not found", link: null};
                                                resolve();
                                            }
                                        }
                                    });


                                } else if (x.type === "form") {
                                    FormModel.findById(hashids.decodeHex(x.data), function (err, form) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            if (form) {
                                                eventdata[x.data] = {title: form.title, description: form.description};
                                                resolve();

                                            } else {
                                                eventdata[x.data] = {title: "Not found", description: "Not found"};
                                                resolve();
                                            }
                                        }
                                    });

                                } else {
                                    reject();
                                }

                            })
                                .catch(function() {
                                    console.log("error in tempf");
                                });
                        };

                        outputeventstemp.forEach(function(id) {
                            eventpromises.push(tempfunction(id));
                        });

                        return Promise.all(eventpromises).then(function () {
                            console.log("promise all completed");
                        });


                    })
                    .then(function() {
                        // merge the data
                        console.log("merging events");
                        for (var i = 0; i < outputeventstemp.length; i++) {
                            outputevents[i] = outputeventstemp[i];
                            outputevents[i].details = eventdata[outputeventstemp[i].data];
                        }
                    });


            })
            .then(function () {
                // for privacy settings, get the network
                // network edges
                return new Promise(function(resolve, reject){
                    NetworkEdgesModel.find({userid: req.session.userid, status: true}).cursor()
                        .on('data', function(edge){
                            // edge.userid will contain two IDs, we want the other one (not userdbid)
                            if (edge.userid[0] != req.session.userid) {
                                networkdatatemp.push({id: hashids.encodeHex(edge._id), userid: edge.userid[0], status: edge.status});
                            } else {
                                networkdatatemp.push({id: hashids.encodeHex(edge._id), userid: edge.userid[1], status: edge.status});
                            }
                        })
                        .on('error', function(err){
                            reject(err);
                        })
                        .on('end', function(){
                            resolve();
                        });
                })
                    .then(function () {
                        // query username and link of the person's network
                        var tempfunctionnetwork = function(x) {
                            var promise = new Promise(function(resolve, reject){
                                UserModel.findById(x.userid, function (err, user) {
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

                                        networkdata.push({name: user.name, pic: [tempa, tempb], link: hashids.encodeHex(user._id), status: x.status, edgeid: x.id});
                                        resolve();
                                    }
                                });
                            }).catch(function () {
                                console.log("error network data");
                            });
                            return promise;
                        };

                        networkdatatemp.forEach(function(id) {
                            networkpromise.push(tempfunctionnetwork(id));
                        });

                        return Promise.all(networkpromise).then(function () {
                            console.log("promise all completed interim (network)");
                        });
                    });

            })
            .then(function () {
                res.json({status: 1, data: datauserinfo, network: networkdata, notifications: outputevents});
            })
            .catch(function () {
                res.json({status: 0});
            });

    });

    app.post('/users/settings/addtonetwork', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetuserid = hashids.decodeHex(req.body.targetid);
        console.log("add to network request "+targetuserid+" "+req.session.userid);

        // variables
        var edgeid = null;
        var status = 0;

        new Promise(function(resolve, reject) {
            // set the network edges
            NetworkEdgesModel.create({userid: [targetuserid, req.session.userid], status: false, timestamp: Date.now()}, function(err, k) {
                if (err) {
                    reject(err);
                } else {
                    edgeid = hashids.encodeHex(k._id);
                    resolve();
                }
            });
        })
            .then(function () {

                return new Promise(function(resolve, reject) {
                    if (edgeid != null) {
                        EventModel.create({userid: targetuserid, type: "network", seen: false, acted: false, data: edgeid, timestamp: Date.now()}, function(err, k) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve();
                                status = 1;
                            }
                        });
                    } else {
                        resolve();
                    }
                });
            })
            .then(function () {
                res.json({status: status});

            })
            .catch(function () {
            console.log("error query user");
        });
    });

    app.post('/users/settings/acceptnetworkrequest', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var targetid = hashids.decodeHex(req.body.edgeid);
        var eventid = hashids.decodeHex(req.body.eventid);

        return new Promise (function(resolve, reject) {
            NetworkEdgesModel.findOneAndUpdate({_id: targetid, userid: req.session.userid}, {$set: {status: true}}, function(err, k) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        })
            .then(function () {
                // update logs
                EventModel.findOneAndUpdate({_id: eventid, userid: req.session.userid}, {$set: {seen: true, acted: true}}, function(err, k) {
                    if (err) {
                        res.json({status: 0});
                    } else {
                        res.json({status: 1});
                    }
                });
            });

    });

    app.post('/users/settings/deletenetworkrequest', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var targetid = hashids.decodeHex(req.body.edgeid);
        var eventid = hashids.decodeHex(req.body.eventid);

        return new Promise (function(resolve, reject) {
            NetworkEdgesModel.remove({_id: targetid, userid: req.session.userid}, function(err, k) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        })
            .then(function () {
                // update logs
                EventModel.remove({_id: eventid, userid: req.session.userid}, function(err, k) {
                    if (err) {
                        res.json({status: 0});
                    } else {
                        res.json({status: 1});
                    }
                });
            });
    });

    app.post('/users/settings/deletenetwork', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var targetid = hashids.decodeHex(req.body.edgeid);

        new Promise(function(resolve, reject) {
            NetworkEdgesModel.remove({_id: targetid, userid: req.session.userid}, function (err) {
                if (!err) {
                    // ok
                    resolve();
                }
                else {
                    reject();
                }
            });
        })
            .then(function () {
                EventModel.remove({data: req.body.edgeid}, function(err) {
                    if (!err) {
                        // ok
                        res.json({status: 1});
                    } else {
                        res.json({status: 0});

                    }
                });

        })
            .catch(function () {
                res.json({status: 0});

            });
    });

    app.post('/users/settings/removefromnetwork', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetuserid = hashids.decodeHex(req.body.targetid);
        console.log("remove from network request "+targetuserid+" "+req.session.userid);

        //
        var edgeid = [];
        var promises = [];

        new Promise(function(resolve, reject){
            NetworkEdgesModel.find({userid: req.session.userid, status: true}).cursor()
                .on('data', function(edge){
                    // edge.userid will contain two IDs, we want the other one (not userdbid)
                    if (edge.userid[0] == targetuserid || edge.userid[1] == targetuserid) {
                        edgeid.push(edge._id);
                    }
                })
                .on('error', function(err){
                    reject(err);
                })
                .on('end', function(){
                    resolve();
                });
        })
        .then(function () {
            var tempfunctionDeleteEdge = function(x) {
                var promise = new Promise(function(resolve, reject){
                    NetworkEdgesModel.remove({_id: x, userid: req.session.userid}, function(err) {
                        if (!err) {
                            // ok
                            resolve();
                        }
                        else {
                            reject();
                        }
                    });
                })
                    .then(function () {
                        EventModel.remove({data: hashids.encodeHex(x)}, function(err) {
                            if (!err) {
                                // ok
                            } else {
                                //
                            }
                        });

                    });
                return promise;
            };

            edgeid.forEach(function(id) {
                promises.push(tempfunctionDeleteEdge(id));
            });

            return Promise.all(promises).then(function () {
                console.log("promise all completed delete edge");
            });
        })
        .then(function () {
            res.json({status: 1});
        })
        .catch(function () {
            res.json({status: 0});
        });

    });

    app.post('/users/settings/report', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetuserid = hashids.decodeHex(req.body.targetid);
        //
        UserModel.findByIdAndUpdate(targetuserid, {$set: {report: {set: true, by: req.session.userid, timestamp: Date.now()}}}, function(err, k) {
            if (err) {
                console.log("Error in reporting user"+err);
                res.json({data: 0});
            } else {
                console.log("Reported user");
                res.json({data: 1});
            }
        });
    });

    app.put('/users/settings/generalQuestions', manager.ensureLoggedIn('/users/login'), function(req,res) {
        console.log("general questions reached");
        console.log(req.body);

        UserModel.findByIdAndUpdate(req.session.userid,
            {$set: {education: req.body.data}}, function(err, k) {
                if (err) {
                    console.log("Error in updating settings"+err);
                } else {
                    console.log("Updated settings");
                    res.json({
                        message: 'success',
                        data: 1
                    });
                }
            });

    });

    app.post('/users/settings/acceptcommrequest', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var commid = hashids.decodeHex(req.body.commid);
        var eventid = hashids.decodeHex(req.body.eventid);

        return new Promise (function(resolve, reject) {
            CommunityModel.findOneAndUpdate({_id: commid}, {$push: {members: req.session.userid}}, function(err, k) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
        })
            .then(function () {
                // update logs
                EventModel.findOneAndUpdate({_id: eventid, userid: req.session.userid}, {$set: {seen: true, acted: true}}, function(err, k) {
                    if (err) {
                        res.json({status: 0});
                    } else {
                        res.json({status: 1});
                    }
                });
            });

    });

    app.post('/users/settings/deletecommrequest', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var eventid = hashids.decodeHex(req.body.eventid);

        EventModel.remove({_id: eventid, userid: req.session.userid}, function(err, k) {
            if (err) {
                res.json({status: 0});
            } else {
                res.json({status: 1});
            }
        });
    });

};
