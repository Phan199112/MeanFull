var UserModel = require('../db.models/user.model');
var PostModel = require('../db.models/post.model');
var AnswersModel = require('../db.models/answers.model');

exports.ensureAuthenticatedUserInSession = function (req, res, next) {
    UserModel.findById(req.session.userid, function (err, user) {
        if (err) {
            next('router');
        } else {
            if (user) {
                req.session.user = user;
                next();
            } else {
                next('router');
            }
        }
    });
};

exports.profilePublic  = function profilePublic(x) {
    return new Promise(function(resolve, reject){
        UserModel.findById(x, function (err, userinfo) {
            if (err) {
                reject(err);
            } else {
                if (userinfo) {
                    resolve(userinfo.public);
                } else {
                    resolve(false);
                }
            }
        });
    });
};

exports.incrementNoTaken = function incrementNoTaken(userid) {
        UserModel.findByIdAndUpdate(userid, {$inc: {notaken:1}}, function (err, data) {
            if (err) {
                return false;
            } else {
                //
            }
        });
};

exports.decrementNoTaken = function decrementNoTaken(userid) {
        UserModel.findByIdAndUpdate(userid, {$inc: {notaken:-1}}, function (err, data) {
            if (err) {
                return false;
            } else {
                //
            }
        });
};

exports.incrementNoCreated = function incrementNoCreated(userid) {
    UserModel.findByIdAndUpdate(userid, {$inc: {nocreated:1}}, function (err, data) {
        if (err) {
            return false;
        } else {
            //
        }
    });
};

exports.decrementNoCreated = function decrementNoCreated(userid) {
        UserModel.findByIdAndUpdate(userid, {$inc: {nocreated:-1}}, function (err, data) {
            if (err) {
                return false;
            } else {
                //
            }
        });
};

exports.incrementNoDiscussion = function incrementNoDiscussion(userid) {
        UserModel.findByIdAndUpdate(userid, {$inc: {nodiscussion:1}}, function (err, data) {
            if (err) {
                return false;
            } else {
                //
            }
        });
};

exports.decrementNoDiscussion = function decrementNoDiscussion(userid) {
        UserModel.findByIdAndUpdate(userid, {$inc: {nodiscussion:-1}}, function (err, data) {
            if (err) {
                return false;
            } else {
                //
            }
        });
};

exports.updateUserTags  = function updateUserTags(userid) {
    // this function will be executed when a user signs in and will make certain that the tags list associated with a user profile is up to date

    // variables
    var promiseslist = [];
    var answerpromise = [];
    var answerdata = [];
    var tagsmaster = [];
    var tags = [];

    new Promise(function(resolve, reject) {
        // surveys created by the user
        var tempfunctionCreatedByUser = function() {
            var promise = new Promise(function(resolve, reject){
                PostModel.find({userid: userid}).cursor()
                    .on('data', function(form){
                        if (form.public == true) {
                            tagsmaster.push(form.hashtags);
                        }
                    })
                    .on('error', function(err){
                        reject(err);
                    })
                    .on('end', function(){
                        console.log("done this bit");
                        resolve();
                    });
            });
            return promise;
        };

        // surveys answered by the user
        var tempfunctionAnsweredByUser = function() {
            var promise = new Promise(function(resolve, reject){
                AnswersModel.find({userid: userid}).cursor()
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
                        PostModel.findById(x, function (err, form) {
                            if (err) {
                                reject(err);
                            } else {
                                if (form) {
                                    if (form.public === true) {
                                        tagsmaster.push(form.hashtags);
                                        resolve();
                                    } else {
                                        resolve();
                                    }
                                } else {
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
                    //ok
                });
            })
                .catch(function (err) {
                    console.log("error: tempfunctionAnsweredByUser:  "+err);
                });
            return promise;
        };


        // execute
        promiseslist.push(tempfunctionCreatedByUser());
        promiseslist.push(tempfunctionAnsweredByUser());

        return Promise.all(promiseslist).then(function () {
            resolve();
        }).catch(function (err) {
            console.log("error"+err);
            reject();
        });
    })
        .then(function () {
            if (tagsmaster[0] === null) {
                for (l = 0; l < tagsmaster.length; l++) {
                    for (j=0; j < tagsmaster[l].length; j++) {
                        if (tags.indexOf(tagsmaster[l][j]) == -1) {
                            tags.push(tagsmaster[l][j]);
                        }
                    }
                }
            }
        })
        .then(function () {
            UserModel.findByIdAndUpdate(userid,
                {$set: {"tags": tags}}, function(err, k) {
                    if (err) {
                        console.log("Error in setting tags (write):  "+err);
                    } else {
                        // ok
                    }
                });
        })
        .catch(function (err) {
            console.log("Error in setting tags (catch):  "+err);
        });
};

exports.getProfilePic = function getProfilePic(user) {
    if (user.facebookID != null) {
        return 'https://graph.facebook.com/' + user.facebookID + '/picture?width=80&height=80';
    }
    return user.pic;
};

exports.getDisplayName = function (user) {
    if (user.provider === "facebook") {
        return user.displayName;
    } else {
        return user.name.first + ' ' + user.name.last;
    }
};
