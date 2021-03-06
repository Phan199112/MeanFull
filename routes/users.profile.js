var UserModel = require('../db.models/user.model');
var PostModel = require('../db.models/post.model');
var AnswersModel = require('../db.models/answers.model');
var NetworkEdgesModel = require('../db.models/networkedges.model');
var GroupModel = require('../db.models/group.model');
var DiscussionModel = require('../db.models/discussion.model');
var math = require("../functions/math");
var userfunctions = require('../functions/users');

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

    app.post('/users/updateLocation', function(req,res) {
        var location = req.body.location;

        new Promise(function (resolve, reject) {
            UserModel.findByIdAndUpdate(req.session.userid, { $set: { location: location } }, function (err, k) {
                if (err) {
                    res.json({ status: 0 });
                } else {
                    res.json({ status: 1 });
                }
            });
        });
    });



    app.get('/users/feedlist', manager.ensureLoggedIn('/users/login'), userfunctions.ensureAuthenticatedUserInSession, function (req, res) {
        // list for feed, provide 9 users

        // variables
        var loggedin = false;
        var usersdata = [];
        loggedin = true;

        // mongoDB query
        new Promise(function(resolve, reject) {
            UserModel
            .find({
                public: true,
                organization: req.session.user.organization,
            })
            .sort({ '_id': 'desc' })
            .limit(100)
            .exec(function (err, k) {
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
                                var user = k[randomints[j]];
                                usersdata.push({
                                    name: user.name.first+" "+user.name.last,
                                    link: hashids.encodeHex(user._id),
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
    app.post('/users/profile/:id', function(req, res, next) {

        var userdbid = hashids.decodeHex(req.params.id);
        var load_full = true;
        if (req.body.slim) {
            load_full = false;
        }

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
        var innetworktemp = {status: false, found: false, pendingRequestFromLoggedInUser: false};

        var tempfunctionUser = function() {
            return new Promise(function(resolve, reject){
                UserModel.findById(userdbid, function (err, userinfo) {
                    if (err) {
                        reject(err);
                    } else {
                        debugger;
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
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic,
                                    facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false,
                                    pending: false, nocreated: userinfo.nocreated, notaken: userinfo.notaken,
                                    nodiscussion: userinfo.nodiscussion, pendingRequestFromLoggedInUser: false};
                                resolve();

                            } else if (userinfo.public === true) {
                                status = 1;
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic,
                                    facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false,
                                    pending: false, nocreated: userinfo.nocreated, notaken: userinfo.notaken,
                                    nodiscussion: userinfo.nodiscussion, pendingRequestFromLoggedInUser: false};
                                resolve();

                            } else {
                                // test whether or not you're a friend
                                // we'll do this later, in the NetworkEdges function
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic,
                                    facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false,
                                    pending: false, nocreated: userinfo.nocreated, notaken: userinfo.notaken,
                                    nodiscussion: userinfo.nodiscussion, pendingRequestFromLoggedInUser: false};
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
                                innetworktemp.pendingRequestFromLoggedInUser = (edge.userid[1] === req.session.userid);
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

        // push promises to array
        promiseslist.push(tempfunctionUser());
        if (load_full) {
            promiseslist.push(tempfunctionNetworkEdges());
        }

        return Promise.all(promiseslist).then(function () {
            // merge some data
            if (innetworktemp.found === true && innetworktemp.status === true) {
                userdata.innetwork = true;
            } else if (innetworktemp.found === true && innetworktemp.status === false && me === false) {
                userdata.pending = true;
                userdata.pendingRequestFromLoggedInUser = innetworktemp.pendingRequestFromLoggedInUser;
            } else {
                userdata.innetwork = false;
                userdata.pending = false;
            }

            if (status === 2) {
                // we need to do some checks first to see whether
                if (innetworktemp.status === true) {
                    // send back
                    res.json({status: 1, loggedin: loggedin, userprofile: userdata, network: networkdata});

                } else {
                    // so the visitor is not connected.
                    // we should only desplay a basic profile
                    // no feed
                    // no communities
                    // no friend list
                    res.json({status: 2, loggedin: loggedin, userprofile: userdata, network: null});

                }

            } else if (status === 1) {
                // send back
                res.json({status: status, loggedin: loggedin, userprofile: userdata, network: networkdata});

            } else if (status === 0) {
                res.json({status: 0});

            } else {
                res.json({status: 0});
            }
        });


    });

    // individual profile
    app.get('/users/profile_slim/:id', function(req, res, next) {

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
                        debugger;
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
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic,
                                    facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false,
                                    pending: false, nocreated: userinfo.nocreated, notaken: userinfo.notaken,
                                    nodiscussion: userinfo.nodiscussion};
                                resolve();

                            } else if (userinfo.public === true) {
                                status = 1;
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic,
                                    facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false,
                                    pending: false, nocreated: userinfo.nocreated, notaken: userinfo.notaken,
                                    nodiscussion: userinfo.nodiscussion};
                                resolve();

                            } else {
                                // test whether or not you're a friend
                                // we'll do this later, in the NetworkEdges function
                                userdata = {gender: userinfo.gender, name: userinfo.name, pic: userinfo.pic,
                                    facebookID: userinfo.facebookID, location: userinfo.location, me: me, innetwork: false,
                                    pending: false, nocreated: userinfo.nocreated, notaken: userinfo.notaken,
                                    nodiscussion: userinfo.nodiscussion};
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

        // push promises to array
        promiseslist.push(tempfunctionUser());

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
                    res.json({status: 1, loggedin: loggedin, userprofile: userdata, network: networkdata});

                } else {
                    // so the visitor is not connected.
                    // we should only desplay a basic profile
                    // no feed
                    // no communities
                    // no friend list
                    res.json({status: 2, loggedin: loggedin, userprofile: userdata, network: null});

                }

            } else if (status === 1) {
                // send back
                res.json({status: status, loggedin: loggedin, userprofile: userdata, network: networkdata});

            } else if (status === 0) {
                res.json({status: 0});

            } else {
                res.json({status: 0});
            }
        });


    });

};
