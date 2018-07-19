var GroupModel = require('../db.models/group.model');
var UserModel = require('../db.models/user.model');
var FormModel = require('../db.models/form.model');
var EventModel = require('../db.models/event.model');
var EmailStoreModel = require('../db.models/emailStore.model');
var math = require("../functions/math");
var log = require("../functions/logs");
var networkfunctions = require('../functions/network');
var usersfunctions = require('../functions/users');
var notifications = require("../functions/notifications");
var commfunctions = require('../functions/groups');
var formfunctions = require('../functions/forms');
var emailfunctions 	= require("../functions/email");

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // save a new community
    app.post('/group/save', manager.ensureLoggedIn('/users/login'), usersfunctions.ensureAuthenticatedUserInSession, function (req, res) {
        var receivedData =  req.body;
        var unhashedAdmins = [];

        if (!receivedData.title) {
            res.json({status: 0});
            return;
        }

        // Valid category required
        var allCategories = commfunctions.getGroupCategories();
        if (typeof receivedData.category !== 'string' || !allCategories[receivedData.category]) {
            res.json({status: 0});
            return;
        }

        // Determine session -- only applies when category=class
        var session = null;
        if (receivedData.category == 'class') {
            session = receivedData.forCurrentSession ? 'summer2018' : 'fall2018';
        }

        if (receivedData.admins != null) {
            for (var i = 0; i < receivedData.admins.length; i++) {
                // save value
                unhashedAdmins.push(hashids.decodeHex(receivedData.admins[i]));
            }
            console.log("ADMINS:", unhashedAdmins);

        }

        // mongodb
        GroupModel.create(
            {
                adminuserid: [req.session.userid],
                members: [req.session.userid],
                title: receivedData.title,
                category: receivedData.category,
                organization: req.session.user.organization,
                hashtags: receivedData.hashtags,
                public: allCategories[receivedData.category].shouldBePublic,
                pic: receivedData.pic,
                description: receivedData.description,
                timestamp: Date.now(),
                session: session,
            },
            function(err, k) {
                if (err) {
                    res.json({status: 0});
                } else {
                    // write notifictions
                    if (unhashedAdmins != null) {
                        for (var i = 0; i < unhashedAdmins.length; i++) {
                            var currentAdmin = unhashedAdmins[i];
                            // notification
                            notifications.createNotification(currentAdmin, req.session.userid, "comm-admin", "Community invitation", hashids.encodeHex(k._id));
                            
                            // send email

                            UserModel.findById(currentAdmin, function(err, l) {

                                if (err) {
                                    console.log(err);
                                } else {
                                    // if (Object.keys(l.notifications).length === 0) {
                                        // if (l.notifications.commrequest === true) {

                                            new Promise(function(resolve, reject) {
                                                EmailStoreModel.findOne({userid: currentAdmin}, function(err,e) {
                                                    if (err) {
                                                        console.log("Error fetching emailstore in community");
                                                        reject();
                                                    }
                                                    UserModel.findById(req.session.userid, function (err, me) {
                                                        if (err) {
                                                            console.log("Error fetching user!");
                                                            reject();
                                                        } else {
                                                            var senderName = me.name.first + " " + me.name.last;
                                                            var communityLink = `www.questionsly.com/group/${hashids.encodeHex(k._id)}`;

                                                            if (e) {
                                                                var communityNotifications = e.community;
                                                                communityNotifications.push({ senderName: senderName, communityPic: receivedData.pic, communityTitle: receivedData.title, link: communityLink})

                                                                e.save(function (err) {
                                                                    if (err) {
                                                                        console.log("Problem pushing community update to email store");
                                                                    }
                                                                });
                                                                resolve();

                                                            } else {
                                                                console.log("YOYOYOYOYOYOYOY", currentAdmin);
                                                                EmailStoreModel.create({
                                                                    userid: currentAdmin,
                                                                    community: [{ senderName: senderName, communityPic: receivedData.pic, communityTitle: receivedData.title, link: communityLink }],
                                                                    questions:[],
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
                                            })
                                            .catch(err => {
                                                console.log("emailstore promise rejected");
                                            });


                                            // emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                        // }
                                    // } else {
                                        // if no settings are recorded, emails should be send as this is default policity as signup as well
                                        // emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                    // }
                                }
                            });
                        }
                        res.json({
                            status: 1,
                            id: hashids.encodeHex(k._id),
                            shareToken: commfunctions.getGroupShareToken(k),
                        });
                        
                    }

                    // log
                    log.writeLog(req.session.userid, 'create community', req.ip);

                    // return
                    // res.json({status: 1, id: hashids.encodeHex(k._id)});
                }
        });
    });


    app.put('/group/update', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData = req.body;
        console.log("Received:", receivedData);
        var unhashedAdmins = [];
        var decrypted = hashids.decodeHex(receivedData.commid);
        console.log("Decrypted id:", decrypted);


        var newtitle = receivedData.title;
        var newpublic = receivedData.public;
        var newpic = receivedData.pic;
        var newdescription = receivedData.description;
        var communityLink = `www.questionsly.com/group/${receivedData.commid}`;

        
        if (receivedData.admins != null) {
            for (var i = 0; i < receivedData.admins.length; i++) {
                // save value
                unhashedAdmins.push(hashids.decodeHex(receivedData.admins[i]));
            }
        }


        GroupModel.findOneAndUpdate({_id: decrypted}, {$set: {title: newtitle, description: newdescription, public: newpublic, pic: newpic}}, {new: true}, function (err, doc) {
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
                                //     if (l.notifications.commrequest === true) {
                                //         emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                //     }
                                // } else {
                                //     if no settings are recorded, emails should be send as this is default policity as signup as well
                                //     emailfunctions.sendNotificationCommRequest(l.email, req.user);
                                // }
                                new Promise(function (resolve, reject) {
                                    EmailStoreModel.findOne({ userid: unhashedAdmins[i] }, function (err, e) {
                                        if (err) {
                                            console.log("Error fetching emailstore in community");
                                            reject();
                                        }

                                        UserModel.findById(req.session.userid, function (err, me) {
                                            if (err) {
                                                console.log("Error fetching user!");
                                                reject();
                                            } else {
                                                var senderName = me.name.first + " " + me.name.last;

                                                if (e) {
                                                    var communityNotifications = e.community;
                                                    communityNotifications.push({ senderName: senderName, communityPic: receivedData.pic, communityTitle: receivedData.title, link: communityLink })

                                                    e.save(function (err) {
                                                        if (err) {
                                                            console.log("Problem pushing community update to email store");
                                                        }
                                                    });
                                                    resolve();

                                                } else {
                                                    EmailStoreModel.create({
                                                        userid: unhashedAdmins[i],
                                                        community: [{ senderName: senderName, communityPic: receivedData.pic, communityTitle: receivedData.title, link: communityLink }],
                                                        questions: [],
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
                                    console.log("emailstore promise rejected");
                                });
                            }
                        }});
                    }
                }

                // log
                log.writeLog(req.session.userid, 'update community', req.ip);

                // return
                res.json({ status: 1, id: hashids.encodeHex(doc._id) });
            }
        });

    });


    app.post('/group/invite', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var commid = hashids.decodeHex(req.body.commid);
        var commtitle = req.body.commtitle;
        var commpic = req.body.commpic;
        var communityLink = `www.questionsly.com/group/${req.body.commid}`;


        commfunctions.groupAdmin(commid, req.session.userid).then(function(result) {
            if (result === true) {
                // the current user is an admin
                req.body.userids.forEach(function(userid) {
                    var seluserid = hashids.decodeHex(userid);
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

                                    // var sender = s.name.first + " " + s.name.last;

                                    // if (Object.keys(l.notifications).length === 0) {
                                    //     if (l.notifications.commrequest === true) {
                                    //         emailfunctions.sendNotificationCommRequest(l.email, sender, commtitle, commpic);
                                    //     }
                                    // } else {
                                    //     if no settings are recorded, emails should be send as this is default policity as signup as well
                                    //     emailfunctions.sendNotificationCommRequest(l.email, sender, commtitle, commpic);
                                    // }
                                    new Promise(function (resolve, reject) {
                                        EmailStoreModel.findOne({ userid: seluserid }, function (err, e) {
                                            if (err) {
                                                console.log("Error fetching emailstore in community");
                                                reject();
                                            }

                                            UserModel.findById(req.session.userid, function (err, me) {
                                                if (err) {
                                                    console.log("Error fetching user!");
                                                    reject();
                                                } else {
                                                    var senderName = me.name.first + " " + me.name.last;

                                                    if (e) {
                                                        var communityNotifications = e.community;
                                                        communityNotifications.push({ senderName: senderName, communityPic: commpic, communityTitle: commtitle, link: communityLink })

                                                        e.save(function (err) {
                                                            if (err) {
                                                                console.log("Problem pushing community update to email store");
                                                            }
                                                        });
                                                        resolve();

                                                    } else {
                                                        EmailStoreModel.create({
                                                            userid: seluserid,
                                                            community: [{ senderName: senderName, communityPic: commpic, communityTitle: commtitle, link: communityLink }],
                                                            questions: [],
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
                                        console.log("emailstore promise rejected");
                                    });

                                 }
                            });


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
    app.get('/group/retrieve/:id', function(req, res) {

        var decrypted = hashids.decodeHex(req.params.id);
        console.log(decrypted);

        // mongoDB findByID
        GroupModel.findById(decrypted, function (err, comm) {
            if (err) {
                res.json({status: 0});
            } else {
                if (comm !== null) {
                    // determine whether the current user is a member
                    var ismember = true;
                    var isadmin = false;
                    var isPending = false;
                    var adminId = hashids.encodeHex(comm.adminuserid[0]);
                    // Admins are members in the UI but not in the DB
                    var memberCount = comm.members.length + comm.adminuserid.length;

                    if (req.session.userid) {
                        var encryptedUser = hashids.encodeHex(req.session.userid);
                        console.log("type:", typeof encryptedUser, "Value:", encryptedUser);
                       
                        for (let z of comm.requests) {
                            if (z == encryptedUser ) {
                                isPending = true;
                                break;
                            }
                        }
                    }


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
                        // Picks up to 9 random users to show from members + admins
                        // Note: removes items from comm.members and comm.adminuserid; they are not used below
                        for (var l = 0; l < 9 && comm.members.length + comm.adminuserid.length; l++) {
                            var newval = math.getRandomInt(0, comm.members.length + comm.adminuserid.length - 1);
                            if (newval < comm.members.length) {
                                memberlisttemp.push(comm.members[newval]);
                                comm.members.splice(newval, 1);
                            } else {
                                newval -= comm.members.length;
                                memberlisttemp.push(comm.adminuserid[newval]);
                                comm.adminuserid.splice(newval, 1);
                            }
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
                                    if (user && user.facebookID !== null) {
                                        tempa = "fb";
                                        tempb = user.facebookID;
                                    } else {
                                        if (user && user.pic != null) {
                                            tempa = "local";
                                            tempb = user.pic;
                                        } else {
                                            tempa = "default";
                                            tempb = "male";
                                        }
                                    }

                                    if (user) {
                                        memberlist.push({name: user.name, pic: [tempa, tempb], link: hashids.encodeHex(user._id)});
                                    }

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
                            sendcomm = {
                                title: comm.title,
                                timestamp: comm.timestamp,
                                public: comm.public,
                                description: comm.description,
                                pic: comm.pic,
                                ismember: ismember,
                                isadmin: isadmin,
                                members: memberlist,
                                adminId: adminId,
                                memberCount: memberCount
                            };
                            res.json({status: 1, data: sendcomm, loggedin: req.isAuthenticated() ? '1' : '0'});

                        } else {
                            if (ismember === true) {
                                // send back data
                                sendcomm = {
                                    title: comm.title,
                                    timestamp: comm.timestamp,
                                    public: comm.public,
                                    description: comm.description,
                                    pic: comm.pic,
                                    ismember: ismember,
                                    isadmin: isadmin,
                                    members: memberlist,
                                    adminId: adminId,
                                    memberCount: memberCount
                                };
                                res.json({status: 1, data: sendcomm, loggedin: req.isAuthenticated() ? '1' : '0'});

                            } else {
                                // send back data
                                sendcomm = {
                                    title: comm.title,
                                    timestamp: comm.timestamp,
                                    public: comm.public,
                                    description: comm.description,
                                    pic: comm.pic,
                                    ismember: ismember,
                                    isadmin: isadmin,
                                    members: null,
                                    isPending: isPending,
                                    adminId: adminId,
                                    memberCount: memberCount
                                };
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
    app.get('/group/mylist', manager.ensureLoggedIn('/users/login'), function (req, res) {
        // get the communities for which req.session.userid is a member
        var groupData = [];
        var categories = commfunctions.getGroupCategories();

        return new Promise(function (resolve, reject) {
                GroupModel.find({
                    $or: [{'adminuserid': req.session.userid}, {'members': req.session.userid}]
                }).limit(1000).cursor()
                    .on('data', function (group) {
                        var renderedGroup = {
                            title: group.title,
                            pic: group.pic,
                            id: hashids.encodeHex(group._id),
                            category: group.category,
                        };
                        categories[group.category].groups.push(renderedGroup);
                        groupData.push(renderedGroup);
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
                    res.json({
                        status: 1,
                        data: groupData, // TODO should remove this and make frontend stop using it
                        categories: categories,
                    });
                })
                .catch(function () {
                    res.json({status: 0});
                });
    });

    app.get('/group/:id/members', manager.ensureLoggedIn('/users/login'), usersfunctions.ensureAuthenticatedUserInSession, function(req,res) {
        var users = [];
        var getPromiseToPutUserInList = function(userId) {
            return new Promise(function(resolve, reject){
                UserModel.findById(userId, function (err, user) {
                    if (user) {
                        users.push(user);
                    }
                    resolve();
                });
            }).catch(function () {
            });
        };

        GroupModel.findById(hashids.decodeHex(req.params.id), function (err, group) {
            // Security check
            if (group && group.organization != req.session.user.organization) {
                res.json({status: 0, x: group.organization, y: req.session.user.organization});
                return;
            }

            var promises = [];
            if (group) {
                group.members.forEach(function(memberId) {
                    promises.push(getPromiseToPutUserInList(memberId));
                });
            }

            Promise.all(promises).then(function () {
                var renderedUsers = [];
                users.forEach(function (user) {
                    renderedUsers.push({
                        id: user._id,
                        name: usersfunctions.getDisplayName(user),
                        pic: usersfunctions.getProfilePic(user),
                    });
                });

                res.json({
                    status: 1,
                    members: renderedUsers,
                });
            });
        });
    });

    // list for feed
    app.post('/group/list', function (req, res) {
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
            // console.log("PRE MONGODB COMMUNITY LIST CALL")
            new Promise(function(resolve, reject) {
                GroupModel.findRandom({public: true}).limit(100).exec(function (err, k) {
                    if (err) {
                        reject(err);
                    } else {
                        // console.log("POST MONGODB COMMUNITY LIST CALL")

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

            var userCommunitiesLimit = 9;
            if (typeof req.body.userCommunitiesLimit !== "undefined") {
                userCommunitiesLimit = req.body.userCommunitiesLimit;
            }

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
                    var limitrecords = 9;
                    var randomcomm = [];

                    // get four random communities
                    var randomCommunities = function () {
                        var promise = new Promise(function (resolve, reject) {
                            // determine whether the profile the loggon user is visiting is already part of his/her network
                            GroupModel.findRandom().limit(limitrecords).exec(function (err, songs) {
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
                            GroupModel.find({
                                $or: [{'adminuserid': selecteduser}, {'members': selecteduser}]
                            }).limit(userCommunitiesLimit * 2).cursor()
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
                                    if (communitiesdatatemp.length <= userCommunitiesLimit) {
                                        // do nothing all is good
                                        communitiesdata = communitiesdatatemp;

                                    } else {
                                        // get some random communities
                                        var randomints = [];

                                        while (randomints.length != userCommunitiesLimit) {
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
    app.post('/group/join', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var commid =  hashids.decodeHex(req.body.targetid);
        var adminsList = [];
        var pendingRequests = [];

        // one can only manually join if the community is public
        return new Promise(function(resolve, reject){
            // check whether the community is public
            commfunctions.getGroup(commid).then(function(group) {
                if (group.organization != req.session.user.organization) {
                    reject();
                    return;
                }

                if (group.public === true) {
                    // Handle join PUBLIC community
                    resolve();
                } else {
                    // Handle join PRIVATE community
                    GroupModel.findById(commid, function (err, c) {
                        if (err) {
                            reject(err);
                        } else {
                            pendingRequests = c.requests;
                            
                            var ind = pendingRequests.findIndex(z => z === req.session.userid);

                            if (ind == -1) {
                                pendingRequests.push(hashids.encodeHex(req.session.userid));

                                // Notify all members that someone needs to be approved into the community
                                if (c.adminuserid !== null) {
                                    for (l = 0; l < c.adminuserid.length; l++) {
                                        adminsList.push(c.adminuserid[l]);
                                        notifications.createNotification(c.adminuserid[l], req.session.userid, "comm-request", "Request to join community", hashids.encodeHex(commid));
                                    }
                                }
                                c.save(err => {console.log('Error in request to join community');});
                            }

                            // Reject so we dont add them as a member right away
                            reject();
                        }
                    });

                }
            })
        })
            .then(function() {
                // mongodb update the database entry
                GroupModel.findByIdAndUpdate(commid, {$push: {members: req.session.userid}}, function(err, k) {
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

    app.post('/group/accept', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var commid = hashids.decodeHex(req.body.commid);

        GroupModel.findById(commid, function (err, group) {
            var memid = "";
            var userId;

            if (err || !group) {
                res.json({status: 0});
                return;
            } else if (req.body.memberid) {
                // Admin accepting someone
                memid = req.body.memberid;
                userId = hashids.decodeHex(memid);
            } else if (commfunctions.getGroupShareToken(group) != req.body.shareToken) {
                res.json({status: 0});
                return;
            } else {
                // Adding yourself via the share token
                userId = req.session.userid;
            }

            GroupModel.update(
                {_id: commid, members: {$ne: userId}},
                { $push: { members: userId }, $pull: { requests: memid } },
                function (err, k) {
                    if (err) {
                        res.json({status: 0});
                    } else {
                        res.json({ status: 1, category: group.category });
                        EventModel.remove({ data: commid, fromuser: userId }, function (err, k) {
                        });
                    }
                }
            );
        });
    });

    app.post('/group/reject', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var commid = hashids.decodeHex(req.body.commid);
        var userId = hashids.decodeHex(req.body.memberid);

        GroupModel.findByIdAndUpdate(commid, { $pull: { requests: req.body.memberid } }, function (err, k) {
            if (err) {
                res.json({ status: 0 })
            } else {
                // res.json({ status: 1 });

                EventModel.remove({ data: commid, fromuser: userId }, function (err, k) {
                    if (err) {
                        res.json({ status: 0 });
                    } else {
                        res.json({ status: 1 });
                    }
                });
            }
        });
    });





    // leave a community
    app.post('/group/leave', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var receivedData =  hashids.decodeHex(req.body.targetid);
        console.log("join network: ", receivedData);
        // mongodb
        GroupModel.findByIdAndUpdate(receivedData, {$pull: {members: req.session.userid}}, function(err, k) {
            if (err) {
                res.json({status: 0});
            } else {
                res.json({status: 1});
            }
        });
    });

    app.post('/group/report', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetcommid = hashids.decodeHex(req.body.targetid);
        //
        GroupModel.findByIdAndUpdate(targetcommid, {$set: {report: {set: true, by: req.session.userid, timestamp: Date.now()}}}, function(err, k) {
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

    app.post('/group/delete', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetcommid = hashids.decodeHex(req.body.targetid);
        //
        GroupModel.remove({_id: targetcommid, adminuserid: req.session.userid}, function(err, k) {
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

    app.post('/group/shareform', manager.ensureLoggedIn('/users/login'), function(req,res) {

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
                GroupModel.findById(x, function (err, c) {
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
                                    // This email would notify people that a question is shared in a community of theirs.
                                    // TO-DO: Create a notification for this, not an email
                                    // emailfunctions.sendNotificationFormRequest(emailaddresses[l], sender, hashids.encodeHex(formid));
                                    
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