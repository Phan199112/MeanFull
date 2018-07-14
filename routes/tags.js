var TagsModel = require('../db.models/tags.model');
var UserModel = require('../db.models/user.model');
var GroupModel = require('../db.models/group.model');
var networkfunctions = require('../functions/network');
var usersfunctions = require('../functions/users');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    app.post('/tags/list', function (req, res, next) {
        // variables
        var selecteduser;
        var selectedcomm;
        var tagsdata = [];
        var type = '1';

        if (req.body.user == null && req.body.comm == null) {
            type = '1';

        } else if (req.body.user != null && req.body.comm == null) {
            selecteduser = hashids.decodeHex(req.body.user);
            type = '2';

        } else if (req.body.user == null && req.body.comm != null) {
            selectedcomm = hashids.decodeHex(req.body.comm);
            type = '3';

        } else {
            res.json({
                status: 0
            });
        }

        if (type === '1') {
            // mongoDB query
            new Promise(function(resolve, reject) {
                TagsModel.find({}).sort({count: -1}).limit(10).exec(function (err, k) {
                    if (err) {
                        reject(err);
                    } else {
                        if (k !== null && k.hashtags !== null) {
                            for (i=0; i<k.length; i++) {
                                var current = k[i];
                                tagsdata.push({tag: current.tag, count: current.count});
                            }
                        }
                        resolve();
                    }
                })
            })
                .then(function () {
                    res.json({
                        status: 1,
                        data: tagsdata
                    });
                })
                .catch(function () {
                    res.json({
                        status: 0
                    });
                });

        } else if (type === '2') {
            // so we want tags for a particular user
            // we need to check first whether we're authorised to do so (public, connected, me)

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
                    // retrieve the data
                    var promise = new Promise(function(resolve, reject) {
                        UserModel.findById(selecteduser, function (err, k) {
                            if (err) {
                                reject();
                            } else {
                                if (k !== null && k.hashtags !== null) {
                                    for (l = 0; l < k.tags.length; l++) {
                                        tagsdata.push({tag: k.tags[l]});
                                    }
                                    resolve();
                                } else {
                                    reject();
                                }
                            }
                        });
                    });

                    promise.then(function() {
                        res.json({status: 1, data: tagsdata});
                    }, function () {
                            res.json({status: 0});
                        });
            })
                .catch(function () {
                    res.json({status: 0});
                });

        } else if (type === '3') {
            // so we want tags for a particular community

            new Promise(function(resolve, reject){
                GroupModel.findById(selectedcomm, function (err, k) {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(k);
                        if (k !== null && k.hashtags !== null) {
                            for (l=0; l < k.hashtags.length; l++) {
                                tagsdata.push({tag: k.hashtags[l]});
                            }
                        }
                        resolve();
                    }
                });
            })
                .then(function () {
                    res.json({status: 1, data: tagsdata});
                })
                .catch(function () {
                    res.json({status: 0});
                });

        }
    });

};
