var UserModel = require('../db.models/user.model');
var FormModel = require('../db.models/form.model');
var AnswersModel = require('../db.models/answers.model');
var NetworkEdgesModel = require('../db.models/networkedges.model');
var CommunityModel = require('../db.models/community.model');
var DiscussionModel = require('../db.models/discussion.model');
var math = require("../functions/math");

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    app.get('/users/network', function (req, res) {
        var yourfriendsdata = [];
        var networkdatatemp = [];
        var networkpromise = [];
        var userid;

        if (req.query.user) {
            userid = hashids.decodeHex(req.query.user);
        } else if (req.session && req.session.userid) {
            userid = req.session.userid;
        } else {
            return res.json({status: 0});
        }

        // mongoDB query
        return new Promise(function(resolve, reject){
            NetworkEdgesModel.find({userid: userid}).cursor()
                .on('data', function(edge){
                    // edge.userid will contain two IDs, we want the other one (not req.body.user)
                    if (edge.status === true) {
                        if (edge.userid[0] !== userid) {
                            networkdatatemp.push(edge.userid[0]);
                        } else {
                            networkdatatemp.push(edge.userid[1]);
                        }
                    }
                })
                .on('error', function(err){
                    reject(err);
                })
                .on('end', function(){
                    // in network?
                    resolve();
                });
        })
            .then(function () {
                // query username and link of the person's network
                var tempfunctionnetwork = function(x) {
                    var promise = new Promise(function(resolve, reject){
                        UserModel.findById(x, function (err, user) {
                            if (err) {
                                reject(err);
                            } else {
                                if (user) {
                                    yourfriendsdata.push({
                                        name: user.name.first+" "+user.name.last, 
                                        id: hashids.encodeHex(user._id),
                                        fb: user.facebookID,
                                        pic: user.pic,
                                        gender: user.gender
                                    });
                                }
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
                    res.json({
                        status: 1,
                        data: yourfriendsdata
                    });
                });
            })
            .catch(function() {
                res.json({status: 0});
            });

    });


    app.get('/users/feedlist', function (req, res) {
        // list for feed, provide 9 users

        // variables
        var loggedin = false;
        var usersdata = [];
        loggedin = req.isAuthenticated();

        // mongoDB query
        new Promise(function(resolve, reject) {
            UserModel.find({public: true}).limit(100).exec(function (err, k) {
                if (err) {
                    reject(err);
                } else {
                    if (k != null) {
                        if (k.length <= 9) {
                            for (i=0; i<k.length; i++) {
                                var user = k[i];
                                usersdata.push({
                                    name: user.name.first+" "+user.name.last,
                                    id: hashids.encodeHex(user._id),
                                    fb: user.facebookID,
                                    pic: user.pic,
                                    gender: user.gender
                                });
                            }

                        } else {
                            // get some random communities
                            var randomints = [];
                            var nmale = 0;
                            var nfemale = 0;
                            var cmale = 0;
                            var cfemale = 0;

                            // we'll get some from both genders
                            if (!loggedin) {
                                nmale = 5;
                                nfemale = 4;

                            } else {
                                if (req.user.gender === "male") {
                                    nmale = 5;
                                    nfemale = 4;

                                } else {
                                    nmale = 6;
                                    nfemale = 3;
                                }
                            }

                            while (randomints.length !== 9) {
                                var newval = math.getRandomInt(0, k.length);
                                if (randomints.indexOf(newval) === -1) {
                                    var temp = k[newval];

                                    if (temp) {
                                        if (temp.gender === 'male' && cmale < nmale) {
                                            cmale = cmale +1;
                                            randomints.push(newval);

                                        } else if (temp.gender === 'female' && cfemale < nfemale) {
                                            cfemale = cfemale +1;
                                            randomints.push(newval);

                                        }
                                    }
                                }
                            }

                            // add some random members
                            for (j in randomints) {
                                var user = k[j];
                                usersdata.push({
                                    name: user.name.first+" "+user.name.last,
                                    id: hashids.encodeHex(user._id),
                                    fb: user.facebookID,
                                    pic: user.pic,
                                    gender: user.gender
                                });
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
                    data: usersdata,
                    loggedin: loggedin
                });
            })
            .catch(function() {
                // failed
                res.json({
                    status: 0
                });
            });

    });

    // individual profile
    app.get('/users/profile/:id', function(req, res, next) {

        var userdbid = hashids.decodeHex(req.params.id);

        // temp storage
        var userdata = [];
        var memberlisttemp = [];
        var networkdata = [];
        var networkpromise = [];
        var promiseslist = [];
        var networkdatatemp = [];
        var status = 0;
        var nocreated = 0;
        var notaken = 0;
        var nodiscussion = 0;
        var me = false;
        var loggedin = req.isAuthenticated();
        var innetworktemp = {status: false, found: false};

        var tempfunctionUser = function() {
            return new Promise(function(resolve, reject){
                UserModel.findById(userdbid, function (err, userinfo) {
                    if (err) {
                        reject(err);
                    } else {
                        if (userinfo == null) {
                            status = 0;
                            reject("not found");
                        } else {
                            // check whether it is me
                            if (loggedin === true) {
                                if (req.session.userid == userdbid) {
                                    me = true;
                                }
                            }
                            // conditional
                            if (me === true) {
                                status = 1;
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic, facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false, pending: false};
                                resolve();

                            } else if (userinfo.public === true) {
                                status = 1;
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic, facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false, pending: false};
                                resolve();

                            } else {
                                // test whether or not you're a friend
                                // we'll do this later, in the NetworkEdges function
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic, facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false, pending: false};
                                status = 2;
                                resolve();
                            }
                        }
                    }
                });
            })
            .catch(function () {
                console.log("error query user")
            });
        };

        // network edges
        var tempfunctionNetworkEdges = function() {
            return new Promise(function(resolve, reject){
                NetworkEdgesModel.find({userid: userdbid}).cursor()
                    .on('data', function(edge){
                        // edge.userid will contain two IDs, we want the other one (not userdbid)
                        if (edge.status === true) {
                            if (edge.userid[0] !== userdbid) {
                                networkdatatemp.push(edge.userid[0]);
                            } else {
                                networkdatatemp.push(edge.userid[1]);
                            }
                        }

                        if (req.isAuthenticated()) {
                            if (edge.userid[0] === req.session.userid || edge.userid[1] === req.session.userid) {
                                innetworktemp.status = edge.status;
                                innetworktemp.found = true;
                            }
                        }
                    })
                    .on('error', function(err){
                        reject(err);
                    })
                    .on('end', function(){
                        // in network?
                        resolve();
                    });
            })
                .then(function () {
                    // network list
                    if (networkdatatemp !== null) {
                        // if less or equal to nine we'll show all members of network
                        // other wise we'll select some randon ones
                        if (networkdatatemp.length <= 9) {
                            // add some random members
                            for (j=0; j< networkdatatemp.length; j++) {
                                memberlisttemp.push(networkdatatemp[j]);
                            }

                        } else {
                            // get some random users from the network
                            var randomints = [];

                            while (randomints.length != 9) {
                                var newval = math.getRandomInt(0, networkdatatemp.length);
                                if (randomints.indexOf(newval) === -1) {
                                    randomints.push(newval);
                                }
                            }
                            // add some random members
                            for (j in randomints) {
                                memberlisttemp.push(networkdatatemp[j]);
                            }

                        }
                    }

                })
                .then(function () {
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

                                    networkdata.push({name: user.name, pic: [tempa, tempb], link: hashids.encodeHex(user._id)});
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
                    });
                });
        };

        // created surveys
        var tempfunctionCreated = function() {
            var promise = new Promise(function(resolve, reject){
                FormModel.find({userid: userdbid}).cursor()
                    .on('data', function(form){
                        nocreated = nocreated + 1;
                    })
                    .on('error', function(err){
                        reject(err);
                    })
                    .on('end', function(){
                        resolve();
                    });
            });
            return promise;
        };

        // completed surveys
        var tempfunctionTaken = function() {
            var promise = new Promise(function(resolve, reject){
                AnswersModel.find({userid: userdbid}).cursor()
                    .on('data', function(form){
                        notaken = notaken + 1;
                    })
                    .on('error', function(err){
                        reject(err);
                    })
                    .on('end', function(){
                        resolve();
                    });
            });
            return promise;
        };

        // discussion posts
        var tempfunctionDiscussion = function() {
            var promise = new Promise(function(resolve, reject){
                DiscussionModel.find({userid: userdbid}).cursor()
                    .on('data', function(form){
                        nodiscussion = nodiscussion + 1;
                    })
                    .on('error', function(err){
                        reject(err);
                    })
                    .on('end', function(){
                        resolve();
                    });
            });
            return promise;
        };

        // push promises to array
        promiseslist.push(tempfunctionUser());
        promiseslist.push(tempfunctionCreated());
        promiseslist.push(tempfunctionTaken());
        promiseslist.push(tempfunctionDiscussion());
        promiseslist.push(tempfunctionNetworkEdges());

        return Promise.all(promiseslist).then(function () {
            // merge some data
            if (innetworktemp.found === true && innetworktemp.status === true) {
                userdata.innetwork = true;
            } else if (innetworktemp.found === true && innetworktemp.status === false && me === false) {
                userdata.pending = true;
            } else {
                userdata.innetwork = false;
                userdata.pending = false;
            }

            if (status === 2) {
                // we need to do some checks first to see whether
                if (innetworktemp.status === true) {
                    // send back
                    res.json({status: 1, loggedin: loggedin, userprofile: userdata, network: networkdata, notaken: notaken, nocreated: nocreated, nodiscussion: nodiscussion});

                } else {
                    // so the visitor is not connected.
                    // we should only desplay a basic profile
                    // no feed
                    // no communities
                    // no friend list
                    res.json({status: 2, loggedin: loggedin, userprofile: userdata, network: null, notaken: notaken, nocreated: nocreated, nodiscussion: nodiscussion});

                }

            } else if (status === 1) {
                // send back
                res.json({status: status, loggedin: loggedin, userprofile: userdata, network: networkdata, notaken: notaken, nocreated: nocreated, nodiscussion: nodiscussion});

            } else if (status === 0) {
                res.json({status: 0});

            } else {
                res.json({status: 0});
            }
        });


    });

};