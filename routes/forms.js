var FormModel = require('../db.models/form.model');
var AnswersModel = require('../db.models/answers.model');
var CommunityModel = require('../db.models/community.model');
var ReactionsModel = require('../db.models/reactions.model');
var EmailStoreModel = require('../db.models/emailStore.model');
var UserModel = require('../db.models/user.model');
var log = require("../functions/logs");
var notifications = require("../functions/notifications");
var mathfunctions = require('../functions/math');
var networkfunctions = require('../functions/network');
var usersfunctions = require('../functions/users');
var commfunctions = require('../functions/communities');
var formfunctions = require('../functions/forms');
var exportfunctions = require('../functions/export');
var emailfunctions  = require("../functions/email");
var uploadfunctions  = require("../functions/upload");
var fs = require('fs');
var atob = require('atob');
var emailAddress = require("email-addresses");
var publishEvent = require('../functions/eventpubsub');
var formidable = require('formidable');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // update the form
    app.put('/forms/:id', manager.ensureLoggedIn('/users/login'), function(req, res) {
        // this is after page 2
        var receivedData = req.body;

        var promisesnotifications = [];
        var promises = [];

        // outputs
        var unhashedCommunities = [];
        var unhashedUsers = [];
        var categories = [];
        var newEmailAddresses = []; // email addresses that do not match to any existing account
        var formid = null;

        // Author info for emails
        var userName, userPic, questionLink;

        var sharedWithEmailAddresses = emailAddress.parseAddressList(receivedData.sharedWithEmailAddresses);

        // Limit to how many email addresses you can share to
        if (sharedWithEmailAddresses && sharedWithEmailAddresses.length > 1000) {
            sharedWithEmailAddresses = sharedWithEmailAddresses.slice(0, 1000);
        }

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

        if (receivedData.categories != null) {
            for (var z=0; z<receivedData.categories.length; z++) {
                categories.push(receivedData.categories[z].itemName);
            }
        }

        // Get author name and pic for emails to be sent out
        UserModel.findById(req.session.userid, function (err, user) {
            if (err) {
                reject();
            } else {
                if (user) {
                    unhashedUsers.push(user._id);
                    userName = user.name.first + " " + user.name.last;
                    userPic = usersfunctions.getProfilePic(user);
                    questionLink = `https://www.questionsly.com/feed;survey=${req.params.id}`;
                } else {
                    reject();
                }
            }
        });

        // update survey
        var saveSurvey = function() {
            return new Promise(function (resolve, reject) {
                // Note: receivedData contains questions, but it's outdated (has non-S3 URLs) & has no new information
                FormModel.findOneAndUpdate({_id: hashids.decodeHex(req.params.id), userid: req.session.userid},
                    {$set: { title: receivedData.title, categories: categories,
                            description: receivedData.description, anonymous: receivedData.anonymous,
                            hashtags: receivedData.hashtags, loginRequired: receivedData.loginRequired,
                            public: receivedData.public, shared: true, sharedWithUsers: unhashedUsers,
                            sharedWithCommunities: unhashedCommunities}}, function(err, k) {
                        if (err) {
                            console.log(err);
                            reject(err);

                        } else {
                            //
                            console.log("wrote the form update");
                            formid = k._id;
                            resolve();
                        }
                    });
            });
        };
        promises.push(saveSurvey());

        // load users of the community, add them to `unhashedUsers`
        var getuserscomm = function (x) {
            return new Promise(function (resolve, reject) {
                CommunityModel.findById(x, function (err, c) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    } else {
                        if (c.members !== null) {
                            for (let l=0; l < c.members.length; l++) {                                
                                unhashedUsers.push(c.members[l]);
                            }
                        }
                        for (let l=0; l < c.adminuserid.length; l++) {
                            unhashedUsers.push(c.adminuserid[l]);
                        }
                        resolve();
                    }
                });
            });
        };
        if (unhashedCommunities.length > 0) {
            unhashedCommunities.forEach(function(comm) {
                promises.push(getuserscomm(comm));
            });
        }

        // find all users that do or do not match to the given email list,
        // and add to `unhashedUsers` or `newEmailAddresses`
        var getUserByEmailAddress = function (x) {
            return new Promise(function (resolve, reject) {
                UserModel.findOne({ $or:[ {"local.email": x}, {'email': x} ]}, function (err, user) {
                    if (err) {
                        reject();
                    } else {
                        if (user) {
                            unhashedUsers.push(user._id);

                            new Promise(function (resolve, reject) {
                                EmailStoreModel.findOne({ userid: user._id }, function (err, e) {
                                    if (err) {
                                        console.log("Error fetching emailstore in shared question");
                                        reject();
                                    } else {
                                        if (e) {
                                            var sharedNotifications = e.shared;
                                            
                                            sharedNotifications.push({ formid: req.params.id, question: receivedData.title || receivedData.questions[0].body, senderName: userName, senderPic: userPic, link: questionLink });
                                            
                                            e.save(function (err) {
                                                if (err) {
                                                    console.log("Problem pushing form answer update to email store");
                                                }
                                            });

                                            resolve();

                                        } else {
                                            EmailStoreModel.create({
                                                userid: user._id,
                                                questions: [],
                                                community: [],
                                                network: [],
                                                shared: [{ formid: req.params.id, question: receivedData.title || receivedData.questions[0].body, senderName: userName, senderPic: userPic, link: questionLink }]
                                            }, function (err, k) {
                                                if (err) {
                                                    console.log("Failed to create emailstore object", err);
                                                    reject();
                                                } else {
                                                    resolve();
                                                }
                                            });
                                        }
                                    }
                                });
                            }).catch(err => {
                                console.log("emailstore form answer promise rejected", err);
                            });

                        } else {
                            newEmailAddresses.push(x);
                        }
                        resolve();
                    }
                });
            });
        };
        if (sharedWithEmailAddresses)
            sharedWithEmailAddresses.forEach(function (x) {
                promises.push(getUserByEmailAddress(x.address));
            });

        return Promise.all(promises).then(function () {
            // Send notifications to existing users
            var seen = {};
            if (unhashedUsers.length > 0) {
                for (i=0; i < unhashedUsers.length; i++) {
                    if (seen[unhashedUsers[i]]) continue;
                    seen[unhashedUsers[i]] = true;

                    // Sending only first community shared with..
                    if (unhashedUsers[i] != req.session.userid)
                        notifications.createNotification(
                            unhashedUsers[i],
                            receivedData.anonymous === true ? null : req.session.userid,
                            "form",
                            "New survey",
                            {
                                formid: hashids.encodeHex(formid),
                                comm: receivedData.sharedWithCommunities ? receivedData.sharedWithCommunities[0] : null
                            }
                        );
                }
            }

            // Send email to new users
            newEmailAddresses.forEach(function (x) {
                emailfunctions.sendNotificationFormRequest(
                    x,
                    receivedData.anonymous === true ? null : req.user,
                    hashids.encodeHex(formid),
                    receivedData.title || receivedData.questions[0].body
                );
            });

            res.send({status: 1, debugInfo: {uhu: unhashedUsers, nea: newEmailAddresses}});
        })
            .catch(function() {
                res.send({status: 0});
            });
    });

    app.get('/forms/mylist', manager.ensureLoggedIn('/users/login'), function (req, res) {
        var yourformdata = [];

        new Promise(function (resolve, reject) {
            FormModel.find({userid: req.session.userid}).limit(20).cursor()
                .on('data', function (form) {
                    var title;
                    var elipsis = form.questions[0].body.length > 20 ? "..." : "";
                    title = form.title !== "" ? form.title : (form.questions[0].body.substring(0,30) + elipsis);
                    yourformdata.push({title: title, shared: form.shared, id: hashids.encodeHex(form._id)});
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
        var receivedData = req.body;

        var promisesToUploadMedia = [];
        receivedData.questions.forEach(function (question) {
            if (question.pic) {
                if (question.pic.indexOf("questionsly") == -1) { // URL not already in our s3 bucket
                    promisesToUploadMedia.push(
                        new Promise(function (resolve, reject) {
                            uploadfunctions.uploadFromUrlToS3(question.pic, function (err, res, newUrl) {
                                if (err) {
                                    // Instead of totally failing (a case that the frontend doesn't handle), just keep the original URL in there
                                    // reject();
                                    resolve();
                                } else {
                                    question.pic = newUrl;
                                    resolve();
                                }
                            });
                        })
                    );
                }
            }
        });

        Promise.all(promisesToUploadMedia)
        .then(function () {
            // mongodb create
            FormModel.create(
                {
                    userid: req.session.userid,
                    questions: receivedData.questions,
                    anonymous: receivedData.anonymous,
                    hashtags: receivedData.hashtags,
                    categories: receivedData.categories,
                    public: false,
                    shared: false,
                    resultsPublic: true,
                    expired: false,
                    activityEmailSent: false,
                    typeevent: receivedData.typeevent,
                    timestamp: Date.now()
                }, function(err, k) {
                    if (err) {
                        // Error in writing new form
                        res.json({status: 0});
                    } else {
                        // log
                        log.writeLog(req.session.userid, 'create form', req.ip);
                        // update user stats
                        usersfunctions.incrementNoCreated(req.session.userid);
                        // return
                        res.json({id: hashids.encodeHex(k._id), status: 1});
                    }
                }
            );
        })
        .catch(function () {
            res.json({status: 0});
        });
    });



    


    app.post('/forms/answers', function(req, res, next) {
        // add new answer
        var receivedData = req.body;
        var answerformid = hashids.decodeHex(receivedData.id);
        var questionLink = `https://www.questionsly.com/feed;survey=${receivedData.id}`;
        var formauthorid = null;
        var activityEmailSent = null;
        var firstQuestion = "";
        const personwhoanswered = null;
        // double check to see whether this user has already submitted an answer:
        var checkedfordouble = true; // true means do not add again
        var checkedexpired = true;
        var checkedloginRequired = true;
        var proceed = false;
        // promises
        var promises = [];
        var promiseschecks = [];

        var areAllAnswersAnonymous = true;
        receivedData.questions.forEach(function (answer) {
            if (!answer.answerAnonymously)
                areAllAnswersAnonymous = false;
        });

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
                            // console.log("FORM DATA IS: ", form);
                            // look up the author of the form
                            checkedexpired = form.expired;
                            firstQuestion = form.questions[0].body;
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
                    answers: y,
                    timestamp: Date.now()
                }, function (err, k) {
                    if (err) {
                        reject();
                    } else {
                        resolve();
                    }
                });
            });
        };

        var loadedFormModel;
        var formauthorfunction = function (x) {
            return new Promise(function (resolve, reject) {
                FormModel.findById(x, function (err, form) {
                    if (err) {
                        reject();
                    } else {
                        if (form) {
                            loadedFormModel = form;
                            // look up the author of the form
                            formauthorid = form.userid;
                            activityEmailSent = form.activityEmailSent;

                            if (!form.activityEmailSent) {
                                form.activityEmailSent = true;

                                form.save(function (err) {
                                    if (err) {
                                        console.error('Error saving updated activityEmailSent!');
                                    }
                                });
                            }
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

                            // update user stats
                            usersfunctions.incrementNoTaken(req.session.userid);

                            // insite notification
                            notifications.createNotification(formauthorid, areAllAnswersAnonymous ? 'anonymous' : req.session.userid, "form-answer", "New answer", hashids.encodeHex(answerformid));

                            // email notification
                            // check the notification settings of this user
                            publishEvent.surveyCommentAdded(areAllAnswersAnonymous ? null : req.session.userid, loadedFormModel, hashids);
                            res.json({status: 1});
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
                    var anon = {
                        name: { first: "Anonymous", last: "" },
                        gender: "male",
                        fb: false,
                        pic: false
                    }

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

                            eventpubsub.surveyAnswered(null, loadedFormModel, hashids);
                            res.json({status: 1});
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
                // log
                log.writeLog(req.session.userid, 'form deleted', req.ip);
                // user stats
                usersfunctions.decrementNoCreated(req.session.userid);
                publishEvent.surveyDeleted(formid);
                // return
                res.json({status: 1});
            }
            else {
                console.log("Error in deleting form"+err);
                res.json({status: 0});
            }
        });
    });

    app.post('/forms/feed/answered',function (req, res, next) {
        // gives surveys answered by the given user, sorted by answer date (not survey date) (newest first)
        // note: does not support "top survey", filtering by tag, or filtering by community

        if (req.body.user == null) {
            res.json({status: 0});
            return;
        }

        var selecteduser = hashids.decodeHex(req.body.user);
        var queryOffset = (req.body.offset ? req.body.offset : 0);
        var queryLimit = (req.body.limit ? req.body.limit : 10);

        var surveysToReturn = [];
        var authors = [];
        var authorprofiles = [];
        var answerdata = [];

        // ***** Check authorization to see selecteduser's answers *****
        new Promise(function(resolve, reject) {
            if (selecteduser === req.session.userid) {
                resolve();
            } else {
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
            }
        })
        .then(function() {
            // ***** Gets answers made by `selecteduser` *****

            return new Promise(function(resolve, reject){
                AnswersModel
                    // Note: this does not scale well. In order to return n surveys to the client, need to load
                    // *all* answers; some answers correspond to private surveys
                    .find({ userid: selecteduser })
                    .cursor()
                    .on('data', function(ans){
                        answerdata.push(ans);
                    })
                    .on('error', function(err){
                        reject(err);
                    })
                    .on('end', function(){
                        resolve();
                    });
            }).then(function() {
                // ***** For each answer, load the survey, and add it to the result set `surveysToReturn` *****
                var getFormInfo = function(formId, answerTimestamp) {
                    return new Promise(function(resolve, reject){
                        FormModel.findById(formId, function (err, form) {
                            if (err) {
                                reject(err);
                            } else {
                                if (form) {
                                    // Seeing if form is public or person view this on the profile is the user himself
                                    if (form.public === true || selecteduser === req.session.userid) {
                                        // was the form generated by the current user?
                                        var adminrights = (selecteduser === req.session.userid);
                                        // prepare the data
                                        var formdata = {hashtags: form.hashtags, questions: form.questions, expired: form.expired,
                                            shared: form.shared, loginRequired: form.loginRequired,
                                            timestamp: form.timestamp, description: form.description,
                                            title: form.title, admin: adminrights, public: form.public,
                                            typeevent: form.typeevent, categories: form.categories};
                                        surveysToReturn.push({formdata: formdata, id: hashids.encodeHex(form._id), answerTimestamp: answerTimestamp});
                                        authors.push({userid: form.userid, anonymous: form.anonymous, formid: form._id});
                                    }
                                }
                                resolve();
                            }
                        });
                    }).catch(function () {
                        console.log("error answer form data");
                    });
                };

                var answerpromise = [];
                answerdata.forEach(function(answer) {
                    answerpromise.push(getFormInfo(answer.formid, answer.timestamp));
                });

                return Promise.all(answerpromise);
            })
                .catch(function () {
                    console.log("error query user")
                });
        })
        .then(function () {
            // ***** Populate `authorprofiles` - user info for all the authors of the surveys *****

            var getAuthorProfileFor = function(x) {
                return new Promise(function(resolve, reject){
                    if (x.anonymous === false) {
                        UserModel.findById(x.userid, function (err, k) {
                            if (err) {
                                reject(err);
                            } else {
                                authorprofiles[x.formid] = {anonymous: false, facebookID: k.facebookID, pic: k.pic, name: k.name.first+" "+k.name.last, link: hashids.encodeHex(k._id), gender: k.gender, location: k.location};
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

            var authorprofilespromise = [];
            authors.forEach(function(author) {
                authorprofilespromise.push(getAuthorProfileFor(author));
            });
            return Promise.all(authorprofilespromise);
        })
        .then(function () {
            // ***** Merge `surveysToReturn` and `authorprofiles`: attach the right author to each survey *****
            var data = [];
            for (l = 0; l < surveysToReturn.length; l++) {
                data[l] = {
                    formdata: surveysToReturn[l].formdata,
                    id: surveysToReturn[l].id,
                    answerTimestamp: surveysToReturn[l].answerTimestamp,
                    author: authorprofiles[hashids.decodeHex(surveysToReturn[l].id)],
                    highlight: false,
                    found: true
                };
            }

            // ***** Return result, sort by answerTimestamp *****
            res.json({
                status: 1,
                loggedin: req.isAuthenticated(),
                data: data
                    .sort(function (a, b) {return b.answerTimestamp - a.answerTimestamp})
                    .slice(queryOffset, queryOffset + queryLimit)
            });
        })
            .catch(function() {
                res.json({status: 0});
            });
    });


    app.post('/forms/feed',function (req, res, next) {
        // this function retrieved the feed
        // limits to x posts
        // only public posts



        // Get how many are viewed right now and add 12 to be post limit.
        // Skip over the first y - 12 posts
        // Don't search top queries twice (pass in an argument with the top question id to check if we shouldn't pick it up again)
        var postlimit = 12;

        if (req.body.currentPosts.length == 0) {
            postlimit = 12;
        } else {
            postlimit = 12 + req.body.currentPosts.length
        }



        // enable different types of queries
        // query a tag
        var selectedtags;
        var category;
        var topsurvey;
        var selecteduser;
        var queryobj;
        var selectedcomm;
        var anonymous;

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
            // console.log(selectedcomm);
        }

        if (req.body.tag == null) {
            selectedtags = null;
        } else {
            var ind = req.body.tag.indexOf("(");
            selectedtags = req.body.tag.substr(0, ind - 1);
        }


        

        // console.log("query tags: "+selectedtags+", query user: "+selecteduser+", topsurvey: "+topsurvey+", comm: "+selectedcomm);

        if (selectedtags != null && selecteduser == null) {
            // Feed for home page with selected tags
            queryobj = { public: true, shared: true, hashtags: selectedtags};
        } else if (selectedtags == null && selecteduser != null) {
            // Feed for User Profile
            if (req.session.userid == selecteduser) {
                // View own profile
                queryobj = { userid: selecteduser};
            } else {
                // Viewing someone else's profile
                queryobj = {public: true, shared: true, userid: selecteduser};
            }
        } else if (selectedtags == null && selectedcomm != null) {
            // Feed for Community
            queryobj = {shared: true, sharedWithCommunities: selectedcomm};
        }
        else if (selectedtags == null && selecteduser == null && selectedcomm == null) {
            // Feed for home page
            queryobj = { public: true, shared: true };
        }
        else {
            // fall back solution
            queryobj = {public: true, shared: true}
        }

        if (req.body.anonymous) {
            queryobj['anonymous'] = false;
        }




        var selectedforms = [];
        var authors = [];
        var authorprofiles = [];
        var categories = [];
        var authorprofilespromise = [];
        var outputformsdata = [];
        var outputformsdatatemp = [];
        var firstform = {};

        // promises
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
                                    if (true) {
                                    // Not sure why we were checking the conditions below, but it blocked private questions from being shared and viewed by anyone but the poster
                                    // if (((form.public === true || form.sharedWithUsers.indexOf(req.session.userid) >= 0) && form.shared === true) || form.userid === req.session.userid) {
                                        // was the form generated by the current user?
                                        var adminrights = false;
                                        if (req.isAuthenticated()) {
                                            if (req.session.userid === form.userid) {
                                                // yes
                                                adminrights = true;
                                            }
                                        }
                                        // prepare the data
                                        var formdata = {hashtags: form.hashtags, questions: form.questions, expired: form.expired,
                                            shared: form.shared, loginRequired: form.loginRequired,
                                            timestamp: form.timestamp, description: form.description,
                                            title: form.title, admin: adminrights, public: form.public,
                                            typeevent: form.typeevent, categories: form.categories};
                                        // formdata.reactions = formfunctions.reactionssummary(form.reactions);
                                        formdata.reactions = form.reactions;
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

                // retrieve forms by complete queries
                var tempfunctionByQuery = function() {
                    return new Promise(function(resolve, reject){

                        FormModel.find(queryobj).sort({'timestamp': 'desc'}).limit(postlimit).cursor()
                            .on('data', function(form){

                                formid = hashids.encodeHex(form._id);

                                if (req.body.currentPosts.indexOf(formid) != -1) {
                                    resolve();
                                }

                                // if (form._id === shownQuestionsIds);
                                // was the form generated by the current user?
                                var adminrights = false;
                                if (req.isAuthenticated()) {
                                    if (req.session.userid == form.userid) {
                                        // yes
                                        adminrights = true;
                                    }
                                }
                                // prepare the data
                                var formdata = {hashtags: form.hashtags, questions: form.questions, expired: form.expired,
                                    shared: form.shared, loginRequired: form.loginRequired,
                                    timestamp: form.timestamp, description: form.description,
                                    title: form.title, admin: adminrights, public: form.public,
                                    typeevent: form.typeevent, categories: form.categories};
                                // formdata.reactions = formfunctions.reactionssummary(form.reactions);
                                formdata.reactions = form.reactions;
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

                // push promises to array
                promiseslist.push(tempfunctionByQuery());

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
                                    authorprofiles[x.formid] = {anonymous: false, facebookID: k.facebookID, pic: k.pic, name: k.name.first+" "+k.name.last, link: hashids.encodeHex(k._id), gender: k.gender, location: k.location};
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
                    console.log("FORM SHOULD HAVE BEEN ADDED TO THE TOP")
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
                    data: outputformsdata,
                    queryForDebug: queryobj
                });
            })
            .catch(function() {
                res.json({status: 0});
            });
    });

    app.post('/forms/topSurvey', function (req, res, next) {
        var topsurvey = hashids.decodeHex(req.body.topsurvey);
        var loggedin = req.isAuthenticated();
        var formData, authorProfile, finalOutput;

        FormModel.findById(topsurvey, function (err, form) {
            if (err) {
                res.json({ status: 0 });
            } else {
                if (form) {
                    var adminrights = false;
                    if (loggedin) {
                        if (req.session.userid === form.userid) {
                            // yes
                            adminrights = true;
                        }
                    }
                    // prepare the data
                    formData = {
                        hashtags: form.hashtags, questions: form.questions, expired: form.expired,
                        shared: form.shared, loginRequired: form.loginRequired,
                        timestamp: form.timestamp, description: form.description,
                        title: form.title, admin: adminrights, public: form.public,
                        typeevent: form.typeevent, categories: form.categories
                    };

                    return new Promise((resolve, reject) => {
                        if (form.anonymous === false) {
                            UserModel.findById(form.userid, function (err, k) {
                                if (err) {
                                    res.json({ status: 0 });
                                } else {
                                    authorProfile = { anonymous: false, facebookID: k.facebookID, pic: k.pic, name: k.name.first + " " + k.name.last, link: hashids.encodeHex(k._id), gender: k.gender, location: k.location };
                                    resolve();                                                                  
                                }
                            });
                        } else {
                            authorProfile = { anonymous: true };
                            resolve();                        
                        }
                    })
                    .then(() => {
                        finalOutput = { formdata: formData, id: hashids.encodeHex(form._id), author: authorProfile, highlight: true, found: true };

                        res.json({
                            status: 1,
                            loggedin: loggedin,
                            formdata: finalOutput
                        });
                    })
                    .catch(() => {
                        res.json({ status: 0 });                        
                    })
                } else {
                    res.json({ status: 0 });
                }
            }
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
                                if(x == 'anonymous') {
                                    authorprofiles.push("Unknown");
                                    resolve();
                                } else{
                                    reject(err);
                                }
                            } else {
                                if (k !== null) {

                                    if (k.location.city == '' && k.location.country == '') {
                                        // If user hasn't entered an address
                                        authorprofiles.push("Unknown");
                                    } else {
                                        authorprofiles.push(k.location.city+", "+k.location.state+", "+k.location.country);
                                    }
                                }
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
                // Extract unknown location key/value to push to end of array
                if (counts["Unknown"]) {
                    var unLoc = counts["Unknown"];
                    delete counts["Unknown"];
                }

                for (var count in counts) {
                    sortable.push([count, Math.round(100*counts[count]/total)]);
                }

                sortable.sort(function(a, b) {
                    return b[1] - a[1];
                });

                // Push unknown location to end of array
                if (unLoc) sortable.push(["Unknown", Math.round(100 * counts[unLoc] / total)]);

            })
            .then(function() {
                // keylocations = sortable.slice(0, Math.min(3,sortable.length));
                // if (sortable.length > 3) {
                //     otherlocations = sortable.slice(3, sortable.length);
                // }
            })
            .then(function() {
                res.json({
                    status: 1,
                    data: sortable,
                    // data: keylocations,
                    // otherlocations: otherlocations
                });

                // data is send as array, hence the location is kept constant.
            });

    });

    app.post('/forms/data', function(req, res) {
        // this function queries the answers of the form. Answers will only be displayed if the user is logged in
        // and has answered the question.
        // this route will also query whether the loggedin user has reacted to this form

        var formid = hashids.decodeHex(req.body.link); // unhash
        var resultsPublic = false;
        var questiontypes = []; // array of the question types in the survey
        var loggedin = req.isAuthenticated();
        // promises array
        var promises = [];
        // output variables
        var shortAnswers2 = [];
        var exportdata;
        var answercount;
        var formcompleted = false;

        var formreacted = false;
        var userreaction = null;
        var tempallanswers;

        // if (req.body.link != "zDm5VaNp8ZUodjGN6jzE") return;

        /// temporary function declaration
        // temp functions
        var testformanswered  = function(formid, userid) {
            return new Promise(function(resolve, reject){

                if (req.body.isAuthor) {
                    formcompleted = req.body.isAuthor;
                    resolve();
                };


                AnswersModel.findOne({formid: formid, userid: userid}, function (err, answer) {
                    if (err) {
                        console.log('error testformanswered');
                        reject();
                    } else {
                        // the current user has completed the survey
                        if (answer != null) {
                            formcompleted = true;
                            console.log('completed testformanswered');
                            resolve();
                        } else {
                            if (req.body.answered) formcompleted = req.body.answered;

                            console.log('completed testformanswered null');
                            resolve();
                        }
                    }
                });
            });
        };

        var getformanswers = function(formid) {
            console.log('getformanswers');
            return new Promise(function (resolve, reject) {
                // query all answers and prepare data for plot
                AnswersModel.find({formid: formid}, function (err, allanswers) {
                    if (err) {
                        console.log('error getformanswers');
                        reject();
                    } else {
                        if (allanswers != null && allanswers.length != 0) {
                            console.log('completed getformanswers');
                            // retrieved an array with all answers
                            tempallanswers = allanswers;
                            answercount = allanswers.length;

                            var authorPromises = []

                            allanswers.map(surveyAnsw => {
                                surveyAnsw.answers.map((questionAnsw, i) => {
                                    if (shortAnswers2.length < i + 1) shortAnswers2.push([]);

                                    if (questionAnsw.kind == 'Short Answer') {
                                        if (surveyAnsw.userid !== "anonymous" && questionAnsw.answerAnonymously !== true) {
                                            authorPromises.push(
                                                new Promise ((resolve, reject) => {
                                                    UserModel.findById(surveyAnsw.userid, function (err, usr) {
                                                        if (err) {
                                                            reject();
                                                        } else {
                                                            shortAnswers2[i].push({
                                                                name: `${usr.name.first} ${usr.name.last}`,
                                                                pic: usersfunctions.getProfilePic(usr),
                                                                answer: questionAnsw.answer
                                                            });
                                                            resolve();
                                                        }
                                                    });
                                                })
                                            );
                                        } else {
                                            shortAnswers2[i].push({
                                                name: "Anonymous",
                                                pic: "/images/male.png",
                                                answer: questionAnsw.answer
                                            });
                                        }
                                    }
                                });
                            });

                            Promise.all(authorPromises).then(() => {                            
                                resolve();
                            }).catch(() => { console.log('Problem pushing author names to short responses') })

                        } else {
                            console.log('completed getformanswers null');
                            tempallanswers = null;
                            answercount = 0;
                            resolve();
                        }
                    }
                });
            });
        };

        var testformreacted  = function(formid, userid) {
            return new Promise(function(resolve, reject){
                ReactionsModel.findOne({formid: formid, userid: userid}, function (err, reaction) {
                    if (err) {
                        console.log('error testformreacted');
                        reject();
                    } else {
                        // the current user has completed the survey
                        if (reaction != null) {
                            console.log('completed testformreacted');
                            // query current users reaction
                            formreacted = true;
                            userreaction = reaction.reaction;
                            resolve();
                        } else {
                            console.log('completed testformreacted null');
                            formreacted = false;
                            userreaction = null;
                            resolve();
                        }
                    }
                });
            });
        };

        // start the data gathering
        //  else {
            //
            console.log('start data gathering');

            // handle the multiple async steps with a promise
            new Promise(function(resolve, reject) {
                // first confirm that the results are public and what the question types are
                FormModel.findById(formid, function (err, form) {
                    if (err) {
                        reject();
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

                        console.log('results are public');

                        // execute promises
                        promises.push(testformanswered(formid, req.session.userid));
                        promises.push(testformreacted(formid, req.session.userid));

                        return Promise.all(promises).then(function () {
                            // did the current user answer the form?
                            if (formcompleted) {

                                console.log('user completed form');

                                // get all data and analyze
                                getformanswers(formid).then(function () {
                                    console.log('getformanswers proceeded');

                                    //export
                                    if (answercount > 0) {
                                        console.log('crunching numbers');
                                        exportdata = formfunctions.analyzeAll(tempallanswers, questiontypes);
                                    } else {
                                        exportdata = null;
                                    }

                                    //
                                    res.json({
                                        data: exportdata,
                                        shortAnswers2: shortAnswers2,
                                        count: answercount,
                                        reaction: {reacted: formreacted, userreaction: userreaction},
                                        status: 2,
                                        loggedin: loggedin
                                    });

                                })
                                    .catch(function() {
                                        // error
                                        res.json({
                                            data: null,
                                            shortAnswers2: [],
                                            status: 1,
                                            count: null,
                                            reaction: {reacted: false, userreaction: null},
                                            error: 'error retrieve data',
                                            loggedin: loggedin
                                        });
                                    });

                            } else {
                                // user did not complete this form
                                res.json({
                                    data: '',
                                    shortAnswers2: [],
                                    status: 0,
                                    count: null,
                                    reaction: {reacted: formreacted, userreaction: userreaction},
                                    error: 'not completed',
                                    loggedin: loggedin
                                });

                            }

                        })
                            .catch(function() {
                            // error
                            res.json({
                                data: '',
                                shortAnswers2: [],
                                status: 1,
                                count: null,
                                reaction: {reacted: false, userreaction: null},
                                error: 'error',
                                loggedin: loggedin
                            });
                        });

                    } else {
                        res.json({
                            data: '',
                            shortAnswers2: [],
                            reaction: {reacted: false, userreaction: null},
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
                        shortAnswers2: [],
                        status: 1,
                        count: null,
                        reaction: {reacted: false, userreaction: null},
                        error: 'error DB',
                        loggedin: loggedin
                    });
                });

        // } If end
    });

    // Switch commented out one with current one to disenable filters for non logged in users
    // app.post('/forms/alldata', manager.ensureLoggedIn('/users/login'), function (req, res) {
    app.post('/forms/alldata', function(req, res) {
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
                        // retrieved an array with all answers
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


                    //Pushes author promises into an array authorprofilepromise that is. Look at like 1319, we get authorprofiles array
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
                            // formdata = {
                            //     hashtags: form.hashtags,
                            //     questions: form.questions,
                            //     expired: form.expired,
                            //     timestamp: form.timestamp,
                            //     description: form.description,
                            //     title: form.title,
                            //     anonymous: form.anonymous,
                            //     loginRequired: form.loginRequired
                            // };

                            formdata = {
                                hashtags: form.hashtags, questions: form.questions, expired: form.expired,
                                shared: form.shared, loginRequired: form.loginRequired,
                                timestamp: form.timestamp, description: form.description,
                                title: form.title, public: form.public,
                                typeevent: form.typeevent, categories: form.categories, anonymous: form.anonymous
                            };
                            formdata.reactions = form.reactions | [];
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
                                authorprofile = {anonymous: false, facebookID: k.facebookID, pic: k.pic, name: k.name.first + " " + k.name.last, location: k.location, nocreated: k.nocreated, notaken: k.notaken, nodiscussion: k.nodiscussion, link: hashids.encodeHex(k._id), gender: k.gender};
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


        // Tests summary email
    // app.get('/test-summary', function (req, res) {
    //     emailfunctions.sendSummary();
    //     console.log("Summary Sent");
    // });

    app.post('/forms/generatePDF', function(req,res,next) {
        var form = new formidable.IncomingForm();        
        form.parse(req, function(err, fields, files) {

            // console.log({fields: fields, files: files});
            
            var reportName = `${req.user.name.first}${req.user.name.last}Report.pdf`;

            fs.writeFileSync(reportName, fs.readFileSync(files.survey.path));
            // https://github.com/felixge/node-formidable

            res.status(200).json({});
        });
    });
    
    
    
    app.post('/forms/sendOutPDF', function (req, res) {        
        // Email list
        var emails = req.body.emails;
        var surveyTitle = req.body.title;
        var firstQuestion = req.body.firstQuestion;

        const REPORT_NAME = `${req.user.name.first}${req.user.name.last}Report.pdf`;
        const ROOT_APP_PATH = fs.realpathSync('.'); 
        const REPORT_PATH = ROOT_APP_PATH + '/' + REPORT_NAME;


        var tmp = emailAddress.parseAddressList(emails);              

    
        tmp.forEach(email => {
            emailfunctions.sendReport(email.address, req.user, surveyTitle, firstQuestion, REPORT_PATH);
        });

        setTimeout(()=> {
            fs.unlink(REPORT_PATH, () => {
                console.log('Report Deleted.'); 
            })
        }, 10000);

        res.status(200);

    });

};    


// --------------------------------------------------------------------------


