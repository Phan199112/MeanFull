var FormModel = require('../db.models/form.model');
var AnswersModel = require('../db.models/answers.model');
var UserModel = require('../db.models/user.model');
var log = require("../functions/logs");
var notifications = require("../functions/notifications");
var mathfunctions = require('../functions/math');
var networkfunctions = require('../functions/network');
var usersfunctions = require('../functions/users');
var commfunctions = require('../functions/communities');
var formfunctions = require('../functions/forms');
var exportfunctions = require('../functions/export');
var emailfunctions 	= require("../functions/email");
var fs = require('fs');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // update the form
    app.put('/forms/:id', manager.ensureLoggedIn('/users/login'), function(req, res) {
        // this is after page 2
        var receivedData = req.body;

        // outputs
        var unhashedCommunities = [];
        var unhashedUsers = [];

        if (receivedData.sharedWithCommunities != null) {
            for (var i = 0; i < receivedData.sharedWithCommunities.length; i++) {
                unhashedCommunities.push(hashids.decodeHex(receivedData.sharedWithCommunities[i].value));
            }
        }

        if (receivedData.sharedWithUsers != null) {
            for (var i = 0; i < receivedData.sharedWithUsers.length; i++) {
                // save value
                unhashedUsers.push(hashids.decodeHex(receivedData.sharedWithUsers[i].value));
            }
        }

        // momgoDB update
        FormModel.findOneAndUpdate({_id: hashids.decodeHex(req.params.id), userid: req.session.userid},
            {$set: {questions: receivedData.questions, title: receivedData.title,
            description: receivedData.description, anonymous: receivedData.anonymous,
                    hashtags: receivedData.hashtags, loginRequired: receivedData.loginRequired,
                public: receivedData.public, shared: true, sharedWithUsers: unhashedUsers,
                    sharedWithCommunities: unhashedCommunities, }}, function(err, k) {
            if (err) {
                res.send({status: 0});

            } else {
                // notification
                if (unhashedUsers != null) {
                    for (var i = 0; i < unhashedUsers.length; i++) {
                        // insite notification
                        notifications.createNotification(unhashedUsers[i], req.session.userid, "form", "New survey", hashids.encodeHex(k._id));

                        // email notification
                        var sendername = '';
                        if (receivedData.anonymous === true) {
                            sendername = 'Anonymous';

                        } else {
                            if (req.user != null) {
                                if (req.user.provider === "facebook") {
                                    sendername = req.user.displayName;
                                } else {
                                    sendername = req.user.name.first+' '+req.user.name.last;
                                }
                            }
                        }


                        UserModel.findById(unhashedUsers[i], function(err, l) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (Object.keys(l.notifications).length === 0) {
                                    if (l.notifications.formrequest === true) {
                                        emailfunctions.sendNotificationFormRequest(l.email, req.user, hashids.encodeHex(k._id));
                                    }
                                } else {
                                    // if no settings are recorded, emails should be send as this is default policity as signup as well
                                    emailfunctions.sendNotificationFormRequest(l.email, req.user, hashids.encodeHex(k._id));
                                }
                            }
                        });

                    }
                }
                res.send({status: 1});
            }
        });
    });

    app.get('/forms/mylist', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var yourformdata = [];

        new Promise(function (resolve, reject) {
            FormModel.find({userid: req.session.userid}).limit(20).cursor()
                .on('data', function (form) {
                    yourformdata.push({title: form.title, shared: form.shared, id: hashids.encodeHex(form._id)});
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
                res.json({status: 1, data: yourformdata});

            })
            .catch(function () {
                res.json({status: 0});
            });
    });

    // make the form 'shared' ie no longer in draft mode.
    app.post('/forms/shared', manager.ensureLoggedIn('/users/login'), function(req, res) {
        var formid = hashids.decodeHex(req.body.formid);

        FormModel.findOneAndUpdate({_id: formid, userid: req.session.userid}, {$set:{shared: true}}, {new: true}, function(err, k){
            if(err){
                console.log("Error in updating form"+err);
                res.json({status: 0});
            } else {
                if (k.shared === true) {
                    res.json({status: 1});
                } else {
                    res.json({status: 0});
                }

            }
        });
    });


    // save new form
    app.post('/forms/create', manager.ensureLoggedIn('/users/login'), function (req, res) {
        // input
        var receivedData =  req.body;

        console.log(receivedData);

        // mongodb create
        FormModel.create({userid: req.session.userid,
            title: receivedData.title,
            questions: receivedData.questions,
            description: receivedData.description,
            anonymous: receivedData.anonymous,
            hashtags: receivedData.hashtags,
            public: false,
            shared: false,
            resultsPublic: true,
            expired: false,
            typeevent: receivedData.typeevent,
            timestamp: Date.now()}, function(err, k) {
            if (err) {
                // Error in writing new form
                res.json({status: 0});
            } else {
                // log
                log.writeLog(req.session.userid, 'create form', req.ip);
                // return
                res.json({id: hashids.encodeHex(k._id), status: 1});
            }
        });
    });


    app.post('/forms/answers', function(req, res, next) {
        // add new answer
        var receivedData = req.body;
        var answerformid = hashids.decodeHex(receivedData.id);
        var formauthorid = null;
        // double check to see whether this user has already submitted an answer:
        var checkedfordouble = true; // true means do not add again
        var checkedexpired = true;
        var checkedloginRequired = true;
        var proceed = false;
        // promises
        var promises = [];
        var promiseschecks = [];

        // functions
        var fcheckedfordouble = function () {
            return new Promise(function (resolve, reject) {
                AnswersModel.findOne({userid: req.session.userid, formid: answerformid}, function (err, obj) {
                    if (err) {
                        reject(err);
                    } else {
                        if (obj == null) {
                            checkedfordouble = false;
                            resolve();
                        } else {
                            // don't add any data
                            checkedfordouble = true;
                            resolve();
                        }
                    }
                });
            });
        };

        var fcheckexpired = function () {
            return new Promise(function (resolve, reject) {
                FormModel.findById(answerformid, function (err, form) {
                    if (err) {
                        reject();
                    } else {
                        if (form) {
                            // look up the author of the form
                            checkedexpired = form.expired;
                        }
                        resolve();
                    }
                });
            });
        };

        var fcheckloginRequired = function () {
            return new Promise(function (resolve, reject) {
                FormModel.findById(answerformid, function (err, form) {
                    if (err) {
                        reject();
                    } else {
                        if (form) {
                            // look up the author of the form
                            checkedloginRequired = form.loginRequired;
                        }
                        resolve();
                    }
                });
            });
        };

        var writeanswerfunction = function (x, y, a) {
            return new Promise(function (resolve, reject) {
                AnswersModel.create({
                    userid: a,
                    formid: x,
                    answers: y
                }, function (err, k) {
                    if (err) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
        };

        var formauthorfunction = function (x) {
            return new Promise(function (resolve, reject) {
                FormModel.findById(x, function (err, form) {
                    if (err) {
                        reject();
                    } else {
                        if (form) {
                            // look up the author of the form
                            formauthorid = form.userid;
                        }
                        resolve();
                    }
                });
            });
        };


        // the execution of this function depends on whether the user is signed in
        if (req.isAuthenticated()) {

            new Promise(function(resolve, reject) {

                promiseschecks.push(fcheckedfordouble());
                promiseschecks.push(fcheckexpired());

                return Promise.all(promiseschecks).then(function () {
                    if (checkedfordouble === false && checkedexpired === false) {
                        proceed = true;
                    } else {
                        proceed = false;
                    }
                    resolve();

                }).catch(function() {
                    proceed = false;
                    reject();
                });

            })
                .then(function () {
                    if (proceed === true) {
                        // add the answer and send an email/notification

                        promises.push(writeanswerfunction(answerformid, receivedData.questions, req.session.userid));
                        promises.push(formauthorfunction(answerformid));

                        return Promise.all(promises).then(function () {
                            // log
                            log.writeLog(req.session.userid, 'answered form');

                            // insite notification
                            notifications.createNotification(formauthorid, req.session.userid, "form-answer", "New answer", hashids.encodeHex(answerformid));

                            // email notification
                            // check the notification settings of this user
                            UserModel.findById(formauthorid, function (err, l) {
                                if (err) {
                                    // no email
                                    res.json({status: 1});

                                } else {
                                    if (l) {
                                        // send
                                        if (Object.keys(l.notifications).length === 0) {
                                            if (l.notifications.formactivity === true) {
                                                emailfunctions.sendNotificationFormActivity(l.email, hashids.encodeHex(answerformid));
                                                res.json({status: 1});
                                            } else {
                                                // no email
                                                res.json({status: 1});
                                            }
                                        } else {
                                            // if no settings are recorded, emails should be send as this is default policity as signup as well
                                            emailfunctions.sendNotificationFormActivity(l.email, hashids.encodeHex(answerformid));
                                            res.json({status: 1});
                                        }

                                    } else {
                                        //no user found
                                        res.json({status: 1});
                                    }

                                }
                            });

                        })
                            .catch(function () {
                                res.json({status: 0});
                            });

                    } else {
                        res.json({status: 0});
                    }

                })
                .catch(function () {
                    res.json({status: 0});
                });

        } else {
            // does the form allow anonymous submissions?

            new Promise(function(resolve, reject) {

                promiseschecks.push(fcheckloginRequired());// does the form allow anonymous submissions?
                promiseschecks.push(fcheckexpired());

                return Promise.all(promiseschecks).then(function () {
                    if (checkedloginRequired === false && checkedexpired === false) {
                        proceed = true;
                    } else {
                        proceed = false;
                    }
                    resolve();

                }).catch(function() {
                    proceed = false;
                    reject();
                });

            })
                .then(function () {
                    if (proceed === true) {
                        // add the answer and send an email/notification

                        promises.push(writeanswerfunction(answerformid, receivedData.questions,'anonymous'));
                        promises.push(formauthorfunction(answerformid));

                        return Promise.all(promises).then(function () {
                            // log
                            log.writeLog('anonymous', 'answered form');

                            // insite notification
                            notifications.createNotification(formauthorid, 'anonymous', "form-answer", "New answer", hashids.encodeHex(answerformid));

                            // email notification
                            // check the notification settings of this user
                            UserModel.findById(formauthorid, function (err, l) {
                                if (err) {
                                    // no email
                                    res.json({status: 1});

                                } else {
                                    if (l) {
                                        // send
                                        if (Object.keys(l.notifications).length === 0) {
                                            if (l.notifications.formactivity === true) {
                                                emailfunctions.sendNotificationFormActivity(l.email, hashids.encodeHex(answerformid));
                                                res.json({status: 1});
                                            } else {
                                                // no email
                                                res.json({status: 1});
                                            }
                                        } else {
                                            // if no settings are recorded, emails should be send as this is default policity as signup as well
                                            emailfunctions.sendNotificationFormActivity(l.email, hashids.encodeHex(answerformid));
                                            res.json({status: 1});
                                        }

                                    } else {
                                        //no user found
                                        res.json({status: 1});
                                    }

                                }
                            });

                        })
                            .catch(function () {
                                res.json({status: 0});
                            });

                    } else {
                        res.json({status: 0});
                    }

                })
                .catch(function () {
                    res.json({status: 0});
                });



        }
    });

    app.post('/forms/expire', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var formid = hashids.decodeHex(req.body.id);
        //
        FormModel.findOneAndUpdate({_id: formid, userid: req.session.userid}, {$set: {expired: true}}, function(err, k) {
            if (err) {
                console.log("Error in expiring form"+err);
                res.json({status: 0});
            } else {
                console.log("Expired form");
                log.writeLog(req.session.userid, 'form expired', req.ip);
                res.json({status: 1});
            }
        });
    });

    app.post('/forms/delete', manager.ensureLoggedIn('/users/login'), function(req,res) {
        var formid = hashids.decodeHex(req.body.id);
        //
        FormModel.remove({_id: formid, userid: req.session.userid}, function(err) {
            if (!err) {
                console.log("Deleted form");
                log.writeLog(req.session.userid, 'form deleted', req.ip);
                res.json({status: 1});
            }
            else {
                console.log("Error in deleting form"+err);
                res.json({status: 0});
            }
        });
    });

    // get detailed data to be presented as a table
    // this route is only accessable for the creator of a form, and if the form is an event
    app.post('/forms/resultstable', manager.ensureLoggedIn('/users/login'), function(req,res) {
        // input
        var formid = hashids.decodeHex(req.body.formid);

        // vars
        var allanswers = [];
        var promiselist = [];
        var authorprofiles = [];
        var questiontypes = [];
        var exportdata;
        var exportdata_totals;

        return new Promise (function(resolve, reject) {
            formfunctions.formEvent(formid).then(function(resulttype) {
                if (resulttype) {
                    formfunctions.formAdmin(formid, req.session.userid).then(function(result) {
                        if (result) {
                            resolve();

                        } else {
                            reject();
                        }
                    });

                } else {
                    reject();
                }
            });
        })
            .then(function() {
                // get all the answers to this question
                return new Promise(function(resolve, reject){
                    AnswersModel.find({formid: formid}, function (err, k) {
                        // retrieved and array with all answers
                        if (err) {
                            // error
                            reject();
                        } else {
                            allanswers = k;
                            resolve();
                        }
                    });
                })
                    .then(function() {
                        var tempqtypes = function(x) {
                            return new Promise(function(resolve, reject) {
                                FormModel.findById(x, function (err, form) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        if (form) {
                                            // what are the question types?
                                            // short answer and paragraph should not be plotted
                                            if (form.questions.length > 0) {
                                                for (var a = 0; a < form.questions.length; a++) {
                                                    questiontypes.push(form.questions[a].kind);
                                                }
                                            }

                                        }
                                        resolve();
                                    }
                                });
                            }).catch(function () {
                                console.log("failed q types");
                            });
                        };

                        tempqtypes(formid).then(function() {
                            console.log("did question types");
                        })

                    })
                    .then(function () {
                        // indentify the authors of the answers
                        var tempfunction = function(x) {
                            return new Promise(function(resolve, reject){
                                UserModel.findById(x.userid, function (err, k) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        authorprofiles[x.userid] = {
                                            name: k.name.first+" "+k.name.last,
                                            pic: k.pic,
                                            gender: k.gender,
                                            id: hashids.encodeHex(x.userid)
                                        };
                                        resolve();
                                    }
                                });
                            }).catch(function () {
                                console.log("error query user");
                            });
                        };

                        allanswers.forEach(function(author) {
                            promiselist.push(tempfunction(author));
                        });

                        return Promise.all(promiselist).then(function () {
                            exportdata = formfunctions.analyzeTable(allanswers, authorprofiles);
                            exportdata_totals = formfunctions.analyzeAll(allanswers, questiontypes, false);
                        });

                })
                    .then(function() {
                        res.json({status: 1, data: exportdata, totals: exportdata_totals});
                    })
                    .catch(function() {
                        // no permission or it failed
                        res.json({status: 0});
                    });

            })
            .catch(function() {
                // no permission or it failed
                res.json({status: 0});
            });

    });

    app.post('/forms/resultstabletotals', manager.ensureLoggedIn('/users/login'), function(req,res) {
        // input
        var formid = hashids.decodeHex(req.body.formid);

        // vars
        var allanswers = [];
        var questiontypes = [];
        var exportdata_totals;

        return new Promise (function(resolve, reject) {
            // get all the answers to this question
            return new Promise(function(resolve, reject){
                AnswersModel.find({formid: formid}, function (err, k) {
                    // retrieved and array with all answers
                    if (err) {
                        // error
                        reject();
                    } else {
                        allanswers = k;
                        resolve();
                    }
                });
            })
                .then(function() {
                    var tempqtypes = function(x) {
                        return new Promise(function(resolve, reject) {
                            FormModel.findById(x, function (err, form) {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (form) {
                                        // what are the question types?
                                        // short answer and paragraph should not be plotted
                                        if (form.questions.length > 0) {
                                            for (var a = 0; a < form.questions.length; a++) {
                                                questiontypes.push(form.questions[a].kind);
                                            }
                                        }

                                    }
                                    resolve();
                                }
                            });
                        });
                    };

                    tempqtypes(formid).then(function() {
                        exportdata_totals = formfunctions.analyzeAll(allanswers, questiontypes, false);
                        console.log("data");
                    })
                        .then(function() {
                            resolve();
                        })

                })

                .catch(function () {
                    reject();
                })
        })
            .then(function() {
                console.log("send");
                res.json({status: 1, totals: exportdata_totals});
            })

            .catch(function() {
                // no permission or it failed
                res.json({status: 0});
            });

    });

    app.post('/forms/feed',function (req, res, next) {
        // this function retrieved the feed
        // limits to 10 posts
        // only public posts

        // enable different types of queries
        // query a tag
        var selectedtags = req.body.tag;
        var topsurvey;
        var selecteduser;
        var queryobj;
        var selectedcomm;

        if (req.body.topsurvey == null) {
            topsurvey = null;
        } else {
            topsurvey = hashids.decodeHex(req.body.topsurvey);
        }

        if (req.body.user == null) {
            selecteduser = null;
        } else {
            selecteduser = hashids.decodeHex(req.body.user);
        }

        if (req.body.comm == null) {
            selectedcomm = null;
        } else {
            selectedcomm = hashids.decodeHex(req.body.comm);
        }

        //console.log("query tags: "+selectedtags+", query user: "+selecteduser+", topsurvey: "+topsurvey+", comm: "+selectedcomm);

        if (selectedtags != null && selecteduser == null) {
            queryobj = {public: true, shared: true, hashtags: selectedtags};
        } else if (selectedtags != null && selecteduser != null) {
            queryobj = {public: true, shared: true, hashtags: selectedtags, userid: selecteduser};
        } else if (selectedtags == null && selecteduser != null) {
            queryobj = {public: true, shared: true, userid: selecteduser};
        } else if (selectedtags == null && selectedcomm != null) {
            queryobj = {shared: true, sharedWithCommunities: selectedcomm};
        } else if (selectedtags == null && selecteduser == null && selectedcomm == null){
            queryobj = {public: true, shared: true};
        } else {
            // fall back solution
            queryobj = {public: true, shared: true}
        }

        var selectedforms = [];
        var authors = [];
        var authorprofiles = [];
        var authorprofilespromise = [];
        var outputformsdata = [];
        var outputformsdatatemp = [];
        var firstform = {};

        // to store IDs of surveys that were answered by the current user.
        var answerdata = [];

        // promises
        var answerpromise = [];
        var promiseslist = [];

        //
        new Promise(function(resolve, reject) {
            if (selecteduser === null && selectedcomm === null) {
                resolve();

            } else if (selecteduser === req.session.userid && selectedcomm === null) {
                resolve();

            } else if (selecteduser !== req.session.userid && selectedcomm === null) {
                usersfunctions.profilePublic(selecteduser).then(function(result) {
                    if (result === true) {
                        resolve();

                    } else {
                        networkfunctions.areConnected(selecteduser, req.session.userid).then(function(result) {
                            if (result === true) {
                                resolve();

                            } else {
                                reject();

                            }
                        })
                            .catch(function() {
                                reject();
                            });
                    }
                })
                    .catch(function() {
                        reject();
                    });

            } else if (selecteduser === null && selectedcomm !== null) {
                // check whether it is public
                commfunctions.commPublic(selectedcomm).then(function(result) {
                    if (result === true) {
                        resolve();

                    } else {
                        commfunctions.commMember(selectedcomm, req.session.userid).then(function(result) {
                            //console.log("comm member check "+result);
                            if (result === true) {
                                resolve();
                            } else {
                                reject();
                            }
                        });
                    }
                })

            } else {
                reject();

            }
        })
            .then(function() {
                // retrieve forms by DB id
                var tempfunctionByID = function() {
                    return new Promise(function(resolve, reject) {
                        FormModel.findById(topsurvey, function (err, form) {
                            if (err) {
                                reject(err);
                            } else {
                                if (form) {
                                    if (((form.public === true || form.sharedWithUsers.indexOf(req.session.userid) >= 0) && form.shared === true) || form.userid === req.session.userid) {
                                        // was the form generated by the current user?
                                        var adminrights = false;
                                        if (req.isAuthenticated()) {
                                            if (req.session.userid === form.userid) {
                                                // yes
                                                adminrights = true;
                                            }
                                        }
                                        // prepare the data
                                        var formdata = {hashtags: form.hashtags, questions: form.questions, expired: form.expired, shared: form.shared, loginRequired: form.loginRequired,
                                            timestamp: form.timestamp, description: form.description, title: form.title, admin: adminrights, public: form.public, typeevent: form.typeevent};
                                        firstform = {formdata: formdata, id: hashids.encodeHex(form._id)};
                                        authors.push({userid: form.userid, anonymous: form.anonymous, formid: form._id});
                                        resolve();
                                    } else {
                                        // don't add any data
                                        resolve();
                                    }
                                } else {
                                    // don't add any data
                                    resolve();
                                }
                            }
                        });
                    })
                        .catch(function () {
                            console.log("error query form by id");
                        });
                };

                // retrieve forms by compley queries
                var tempfunctionByQuery = function() {
                    return new Promise(function(resolve, reject){
                        FormModel.find(queryobj).sort({'timestamp': 'desc'}).limit(10).cursor()
                            .on('data', function(form){
                                // was the form generated by the current user?
                                var adminrights = false;
                                if (req.isAuthenticated()) {
                                    if (req.session.userid == form.userid) {
                                        // yes
                                        adminrights = true;
                                    }
                                }
                                // prepare the data
                                var formdata = {hashtags: form.hashtags, questions: form.questions, expired: form.expired, shared: form.shared, loginRequired: form.loginRequired,
                                    timestamp: form.timestamp, description: form.description,
                                    title: form.title, admin: adminrights, public: form.public, typeevent: form.typeevent};
                                selectedforms.push({formdata: formdata, id: hashids.encodeHex(form._id)});
                                authors.push({userid: form.userid, anonymous: form.anonymous, formid: form._id});
                            })
                            .on('error', function(err){
                                reject(err);
                            })
                            .on('end', function(){
                                resolve();
                            });
                    });
                };

                // retrieve forms associated with particular users
                var tempfunctionByUser = function() {
                    return new Promise(function(resolve, reject){
                        AnswersModel.find({userid: queryobj.userid}).limit(10).cursor()
                            .on('data', function(ans){
                                answerdata.push({formid: ans.formid});
                            })
                            .on('error', function(err){
                                reject(err);
                            })
                            .on('end', function(){
                                resolve();
                            });
                    }).then(function() {
                        // get information of the associated form.
                        var tempfunction = function(x) {
                            return new Promise(function(resolve, reject){
                                FormModel.findById(x, function (err, form) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        if (form) {
                                            if (form.public === true && form.shared === true) {
                                                // was the form generated by the current user?
                                                var adminrights = false;
                                                if (req.isAuthenticated()) {
                                                    if (req.session.userid === form.userid) {
                                                        // yes
                                                        adminrights = true;
                                                    }
                                                }
                                                // prepare the data
                                                var formdata = {hashtags: form.hashtags, questions: form.questions, expired: form.expired, shared: form.shared, loginRequired: form.loginRequired,
                                                    timestamp: form.timestamp, description: form.description,
                                                    title: form.title, admin: adminrights, public: form.public, typeevent: form.typeevent};
                                                selectedforms.push({formdata: formdata, id: hashids.encodeHex(form._id)});
                                                authors.push({userid: form.userid, anonymous: form.anonymous, formid: form._id});
                                                resolve();
                                            } else {
                                                // don't add any data
                                                resolve();
                                            }
                                        } else {
                                            // don't add any data
                                            resolve();
                                        }
                                    }
                                });
                            }).catch(function () {
                                console.log("error answer form data");
                            });
                        };

                        answerdata.forEach(function(answer) {
                            answerpromise.push(tempfunction(answer.formid));
                        });

                        return Promise.all(answerpromise).then(function () {
                            console.log("promise all completed interim");
                        });
                    })
                        .catch(function () {
                            console.log("error query user")
                        });
                };

                // execute

                // push promises to array
                promiseslist.push(tempfunctionByQuery());

                if (queryobj.userid != null) {
                    promiseslist.push(tempfunctionByUser());
                }

                if (topsurvey != null) {
                    promiseslist.push(tempfunctionByID());
                }

                return Promise.all(promiseslist).then(function () {
                    console.log("promise all completed");
                }).catch(function () {
                    console.log("error");
                });

            })
            .then(function () {
                // query the users
                // link users to formids
                var tempfunction = function(x) {
                    return new Promise(function(resolve, reject){
                        if (x.anonymous === false) {
                            UserModel.findById(x.userid, function (err, k) {
                                if (err) {
                                    reject(err);
                                } else {
                                    authorprofiles[x.formid] = {anonymous: false, facebookID: k.facebookID, pic: k.pic, name: k.name.first+" "+k.name.last, link: hashids.encodeHex(k._id), gender: k.gender};
                                    resolve();
                                }
                            });
                        } else {
                            authorprofiles[x.formid] = {anonymous: true};
                            resolve();
                        }
                    }).catch(function () {
                        console.log("error query user")
                    });
                };

                authors.forEach(function(author) {
                    authorprofilespromise.push(tempfunction(author));
                });

                return Promise.all(authorprofilespromise).then(function () {
                    console.log("promise all completed");
                });
            })
            .then(function () {
                // merge the data
                for (l = 0; l < selectedforms.length; l++) {
                    outputformsdatatemp[l] = {formdata: selectedforms[l].formdata, id: selectedforms[l].id, author: authorprofiles[hashids.decodeHex(selectedforms[l].id)], highlight: false, found: true};
                }

                // add to the beginning
                if (topsurvey != null) {
                    if (Object.keys(firstform).length !== 0) {
                        outputformsdatatemp.unshift({
                            formdata: firstform.formdata,
                            id: firstform.id,
                            author: authorprofiles[hashids.decodeHex(firstform.id)],
                            highlight: true, found: true
                        });
                    } else {
                        outputformsdatatemp.unshift({highlight: true, found: false});
                    }
                }
            })
            .then(function () {
                // look for duplicates

                // array with IDs for surveys already included
                var alreadyincluded = [];

                // loop and check
                for (l = 0; l < outputformsdatatemp.length; l++) {
                    if (alreadyincluded.indexOf(outputformsdatatemp[l].id) === -1) {
                        outputformsdata.push(outputformsdatatemp[l]);
                        alreadyincluded.push(outputformsdatatemp[l].id);
                    }
                }

            })
            .then(function () {
                var loggedin = req.isAuthenticated();
                res.json({
                    status: 1,
                    loggedin: loggedin,
                    data: outputformsdata
                });
            })
            .catch(function() {
                res.json({status: 0});
            });
    });

    app.post('/forms/report', manager.ensureLoggedIn('/users/login'), function(req,res) {

        var targetformid = hashids.decodeHex(req.body.targetid);
        //
        FormModel.findByIdAndUpdate(targetformid, {$set: {report: {set: true, by: req.session.userid, timestamp: Date.now()}}}, function(err, k) {
            if (err) {
                console.log("Error in reporting form"+err);
                res.json({status: 0});
            } else {
                console.log("Reported form");
                log.writeLog(req.session.userid, 'reported form', req.ip);
                res.json({status: 1});
            }
        });
    });

    app.post('/forms/requestTopLocations', function (req, res) {
        console.log("Query for top locations");
        var formid = hashids.decodeHex(req.body.id);
        var authors = [];
        var authorprofiles = [];
        var authorprofilespromise = [];
        var counts = {}; // Counts is object with key location and value the occurence.
        var sortable = []; // this will be returned to front end., it is the counts ordered
        var keylocations = [];
        var otherlocations = [];
        var total = 0;

        // mongoDB query
        new Promise(function(resolve, reject) {
            AnswersModel.find({formid: formid}).cursor()
                .on('data', function(ans){
                    authors.push(ans.userid); // the authors of the answers
                })
                .on('error', function(err){
                    reject(err);
                })
                .on('end', function(){
                    resolve();
                });
        })
            .then(function () {
                // query the users
                // link users to formids
                var tempfunction = function(x) {
                    var promise = new Promise(function(resolve, reject){
                        UserModel.findById(x, function (err, k) {
                            if (err) {
                                reject(err);
                            } else {
                                authorprofiles.push(k.location.city+", "+k.location.state+", "+k.location.country);
                                resolve();
                            }
                        });
                    }).catch(function () {
                        console.log("error query user")
                    });
                    return promise;
                };

                authors.forEach(function(author) {
                    authorprofilespromise.push(tempfunction(author));
                });

                return Promise.all(authorprofilespromise).then(function () {
                    console.log("promise all completed");
                });
            })
            .then(function() {
                // make a summary
                for (k = 0; k < authorprofiles.length; k++) {
                    counts[authorprofiles[k]] = (counts[authorprofiles[k]] + 1) || 1;
                    total = total + 1;
                }
            })
            .then(function() {
                for (var count in counts) {
                    sortable.push([count, Math.round(100*counts[count]/total)]);
                }

                sortable.sort(function(a, b) {
                    return b[1] - a[1];
                });
            })
            .then(function() {
                keylocations = sortable.slice(0, Math.min(3,sortable.length));
                if (sortable.length > 3) {
                    otherlocations = sortable.slice(3, sortable.length);
                }
            })
            .then(function() {
                res.json({
                    status: 1,
                    data: keylocations,
                    otherlocations: otherlocations
                });

                // data is send as array, hence the location is kept constant.
            });

    });

    app.post('/forms/data', function(req, res) {
        // this function queries the answers of the form. Answers will only be displayed if the user is logged in
        // and has answered the question.

        var formid = hashids.decodeHex(req.body.link); // unhash
        var resultsPublic = false;
        var questiontypes = []; // array of the question types in the survey
        var loggedin = req.isAuthenticated();

        if (req.isAuthenticated()) {
            // handle the multiple async steps with a promise
            new Promise(function(resolve, reject) {
                // first confirm that the results are public and what the question types are
                FormModel.findById(formid, function (err, form) {
                    if (err) {
                        reject(err);
                    } else {
                        if (form) {
                            // are the results public?
                            resultsPublic = form.resultsPublic;

                            // what are the question types?
                            // short answer and paragraph should not be plotted
                            if (form.questions.length > 0) {
                                for (var a= 0; a <  form.questions.length; a++) {
                                    questiontypes.push(form.questions[a].kind);
                                }
                            }

                        } else {
                            resultsPublic = false;
                        }
                        resolve();
                    }
                });

            })
                .then(function() {
                    if (resultsPublic == true) {
                        // mongoDB find answer for current user.
                        AnswersModel.findOne({formid: formid, userid: req.session.userid}, function (err, answer) {
                            if (err) {
                                console.log(err);
                            } else {
                                // the current user has completed the survey
                                if (answer != null) {
                                    // query all answers and prepare data for plot
                                    AnswersModel.find({formid: formid}, function (err, allanswers) {
                                        // retrieved and array with all answers
                                        // compute
                                        var exportdata = formfunctions.analyzeAll(allanswers, questiontypes);
                                        var answercount;

                                        if (allanswers.length > 5) {
                                            answercount = allanswers.length;
                                        } else {
                                            answercount = null;
                                        }

                                        //
                                        res.json({
                                            data: exportdata,
                                            count: answercount,
                                            status: 2,
                                            loggedin: loggedin
                                        });
                                    });

                                } else {
                                    // user did not complete this form
                                    res.json({
                                        data: '',
                                        status: 0,
                                        count: null,
                                        error: 'not completed',
                                        loggedin: loggedin
                                    });
                                }
                            }
                        });
                    } else {
                        res.json({
                            data: '',
                            status: 3,
                            count: null,
                            error: 'not public',
                            loggedin: loggedin
                        });
                    }
                })
                .catch(function() {
                    // error
                    res.json({
                        data: '',
                        status: 1,
                        count: null,
                        error: 'error DB',
                        loggedin: loggedin
                    });
                });

        } else {
            //Feed request from forms not auth
            res.json({
                data: '',
                status: 1,
                count: null,
                error: 'not auth',
                loggedin: loggedin
            });
        }
    });

    app.post('/forms/alldata', manager.ensureLoggedIn('/users/login'), function(req, res) {
        // query answersdata for answers from the logged in user
        // unhash
        var formid = hashids.decodeHex(req.body.link);
        var alltype = req.body.all;
        var dataselection = req.body.dataselection;
        //
        var exportdata = [];
        var allanswers = [];
        var authorprofiles = [];
        var authorprofilespromise = [];
        var questiontypes = [];
        var resultsPublic;

        new Promise(function(resolve, reject) {
            // first confirm that the results are public and what the question types are
            FormModel.findById(formid, function (err, form) {
                if (err) {
                    reject(err);

                } else {
                    if (form) {
                        // are the results public?
                        resultsPublic = form.resultsPublic;

                        // what are the question types?
                        // short answer and paragraph should not be plotted
                        if (form.questions.length > 0) {
                            for (var a= 0; a <  form.questions.length; a++) {
                                questiontypes.push(form.questions[a].kind);
                            }
                        }
                        //
                        resolve();

                    } else {
                        resultsPublic = false;
                        reject();
                    }
                }
            });

        })
            .then(function () {
                //
                var promise = new Promise(function(resolve, reject){
                    AnswersModel.find({formid: formid}, function (err, k) {
                        // retrieved and array with all answers
                        if (err) {
                            // error
                            reject();

                        } else {
                            allanswers = k;
                            resolve();
                        }
                    });
                });

                return promise.then(function () {
                    //ok
                }, function () {
                    console.log("promise not ok");
                });

            })
            .then(function () {
                //
                if (resultsPublic === true) {
                    // dataselection
                    // tempfunction to query the user for gender
                    var tempfunction = function(x) {
                        return new Promise(function(resolve, reject){
                            if (x.userid === "anonymous") {
                                authorprofiles[x.userid] = {type: false};
                                resolve();

                            } else {
                                UserModel.findById(x.userid, function (err, k) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        authorprofiles[x.userid] = {gender: k.gender, dob: k.dob, location: k.location, type: true};
                                        resolve();
                                    }
                                });

                            }

                        }).catch(function () {
                            console.log("error query user");
                        });
                    };

                    allanswers.forEach(function(author) {
                        authorprofilespromise.push(tempfunction(author));
                    });

                    return Promise.all(authorprofilespromise).then(function () {
                        exportdata = formfunctions.analyzeSegregated(allanswers, authorprofiles, dataselection, questiontypes, alltype);
                    })
                        .catch(function(err) {
                            console.log("promise error: "+err);
                        });
                } else {
                    exportdata = null;
                }
            })
            .then(function () {
                res.json({
                    data: exportdata,
                    status: 2
                });
            })
            .catch(function () {
                res.json({
                    data: null,
                    status: 0
                });
            });

    });


    /// has current form been completed by current user?
    app.post('/forms/checkcompleted', function(req, res) {
        // query answersdata for answers from the logged in user
        // unhash
        var formid = hashids.decodeHex(req.body.formid);

        if (req.isAuthenticated()) {
            // mongoDB
            AnswersModel.findOne({formid: formid, userid: req.session.userid}, function (err, answer) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(answer);
                    if (answer != null) {
                        res.json({data: 1});

                    } else {
                        // user did not complete this form
                        res.json({data: 0});
                    }
                }
            });

        } else {
            //Feed request from forms not auth
            res.status(200).json({
                data: 1,
                error: 'not auth'
            });

        }

    });

    app.get('/forms/:id', function(req, res) {
        // declare variables
        var formdata;
        var authorid;
        var authorprofile;

        new Promise(function (resolve, reject) {
            //get data from mongoDB findByID
            FormModel.findById(hashids.decodeHex(req.params.id), function (err, form) {
                if (err) {
                    reject();
                } else {
                    if (form) {
                        if (form.shared == true) {
                            formdata = {
                                hashtags: form.hashtags,
                                questions: form.questions,
                                expired: form.expired,
                                timestamp: form.timestamp,
                                description: form.description,
                                title: form.title,
                                anonymous: form.anonymous,
                                loginRequired: form.loginRequired
                            };
                            authorid = form.userid;
                            resolve();

                        } else {
                            reject();
                        }

                    } else {
                        reject();
                    }

                }
            });
        })
            .then(function () {
                var promise = new Promise(function (resolve, reject) {
                    UserModel.findById(authorid, function (err, k) {
                        // retrieved and array with all answers
                        if (err) {
                            reject();
                        } else {
                            // striate based on whether or not the form is annonymous
                            if (formdata.anonymous == false) {
                                authorprofile = {anonymous: false, facebookID: k.facebookID, pic: k.pic, name: k.name.first+" "+k.name.last, link: hashids.encodeHex(k._id), gender: k.gender};
                                resolve();

                            } else {
                                authorprofile = {anonymous: true};
                                resolve();
                            }
                        }
                    });
                });

                return promise.then(function () {
                    //ok
                }, function () {
                    console.log("promise not ok");
                });

            })
            .then(function () {
                // success return
                var loggedin = req.isAuthenticated();
                res.json({status: 1, formdata: formdata, authordata: authorprofile, loggedin: loggedin});
            })
            .catch(function () {
                // failure
                res.json({status: 0});
            });
    });


    // update the form
    app.get('/forms/download/:id', manager.ensureLoggedIn('/users/login'), function(req, res) {

        var formid = hashids.decodeHex(req.params.id);

        // vars
        var allanswers = [];
        var promiselist = [];
        var authorprofiles = [];
        var questiontypes = [];
        var exportdata;
        var tempdest;

        return new Promise (function(resolve, reject) {
            formfunctions.formEvent(formid).then(function(resulttype) {
                if (resulttype) {
                    formfunctions.formAdmin(formid, req.session.userid).then(function(result) {
                        if (result) {
                            resolve();

                        } else {
                            reject();
                        }
                    });

                } else {
                    reject();
                }
            });
        })
            .then(function() {
                // get all the answers to this question
                return new Promise(function(resolve, reject){
                    AnswersModel.find({formid: formid}, function (err, k) {
                        // retrieved and array with all answers
                        if (err) {
                            // error
                            reject();
                        } else {
                            allanswers = k;
                            resolve();
                        }
                    });
                })
                    .then(function() {
                        var tempqtypes = function(x) {
                            return new Promise(function(resolve, reject) {
                                FormModel.findById(x, function (err, form) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        if (form) {
                                            // what are the question types?
                                            // short answer and paragraph should not be plotted
                                            if (form.questions.length > 0) {
                                                for (var a = 0; a < form.questions.length; a++) {
                                                    questiontypes.push(form.questions[a].kind);
                                                }
                                            }

                                        }
                                        resolve();
                                    }
                                });
                            }).catch(function () {
                                //console.log("failed q types");
                            });
                        };

                        tempqtypes(formid).then(function() {
                            //console.log("did question types");
                        })

                    })
                    .then(function () {
                        // indentify the authors of the answers
                        var tempfunction = function(x) {
                            return new Promise(function(resolve, reject){
                                UserModel.findById(x.userid, function (err, k) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        authorprofiles[x.userid] = k.name.first+" "+k.name.last;
                                        resolve();
                                    }
                                });
                            }).catch(function () {
                                console.log("error query user");
                            });
                        };

                        allanswers.forEach(function(author) {
                            promiselist.push(tempfunction(author));
                        });

                        return Promise.all(promiselist).then(function () {
                            exportdata = formfunctions.exportTable(allanswers, authorprofiles);
                        });

                    })
                    .then(function() {
                        tempdest = exportfunctions.exportcsv(exportdata);

                    })
                    .then(function() {
                        fs.readFile(tempdest, function (err, content) {
                            if (err) {
                                res.writeHead(400, {'Content-type':'text/html'});
                                res.end("No such file");
                            } else {
                                //specify Content will be an attachment
                                res.setHeader('Content-disposition', 'attachment; filename=output.csv');
                                res.end(content);
                            }
                        });

                    })
                    .catch(function() {
                        // no permission or it failed
                        res.writeHead(400, {'Content-type':'text/html'});
                        res.end("No such file");
                    });

            })
            .catch(function() {
                // no permission or it failed
                res.writeHead(400, {'Content-type':'text/html'});
                res.end("No such file");
            });


    });

};

