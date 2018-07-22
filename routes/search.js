var TagsModel = require('../db.models/tags.model');
var UserModel = require('../db.models/user.model');
var GroupModel = require('../db.models/group.model');
var PostModel = require('../db.models/post.model');
var autocomplete = require('../modules/mongoose-in-memory-autocomplete-multiple/main');
var cron = require('node-cron');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    // vars for search
    var TagsAutoComplete;
    var CommunityAutoComplete;
    var UserAutoComplete;

    // confirguration
    var configurationTag = {
        //Fields being autocompleted, they will be concatenated
        autoCompleteFields: ["tag"],
        //Returned data with autocompleted results
        dataFields: ["count", "_id"],
        //Maximum number of results to return with an autocomplete request
        maximumResults: 10,
        //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
        model: TagsModel
    };

    var configurationCommunity = {
        //Fields being autocompleted, they will be concatenated
        autoCompleteFields: ["title"],
        //Returned data with autocompleted results
        dataFields: ["_id"],
        //Maximum number of results to return with an autocomplete request
        maximumResults: 10,
        //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
        model: GroupModel
    };

    var configurationUser = {
        //Fields being autocompleted, they will be concatenated
        autoCompleteFields: ["searchname"],
        //Returned data with autocompleted results
        dataFields: ["_id"],
        //Maximum number of results to return with an autocomplete request
        maximumResults: 10,
        //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
        model: UserModel
    };

    // crons for search
    var indexerCron = function () {
        TagsAutoComplete = new autocomplete.AutoComplete(configurationTag, function () {
            //any calls required after the initialization
            console.log("Tags Loaded " + TagsAutoComplete.getCacheSize() + " words in auto complete");
        });

        CommunityAutoComplete = new autocomplete.AutoComplete(configurationCommunity, function () {
            //any calls required after the initialization
            console.log("Community Loaded " + CommunityAutoComplete.getCacheSize() + " words in auto complete");
        });

        UserAutoComplete = new autocomplete.AutoComplete(configurationUser, function () {
            //any calls required after the initialization
            console.log("User Loaded " + UserAutoComplete.getCacheSize() + " words in auto complete");
        });
    };
    cron.schedule('*/5 * * * *', indexerCron);
    indexerCron(); // index immediately when we start

    app.post('/search', function (req, res) {
        var keyword = req.body.keyword;
        var type = req.body.type;

        if (type === 'tag') {
            if (!TagsAutoComplete) {res.json({status: 0}); return;}
            TagsAutoComplete.getResults(keyword, function (err, words) {
                if (err) {
                    console.log(err);
                    res.json({status: 0});
                } else {
                    // loop the change format
                    var output = [];
                    for (var i = 0; i < words.length; i++) {
                        output.push({display: words[i].word+' ('+words[i].data[0]+')', value: words[i].word});
                    }
                    res.json({status: 1, results: output});
                }
            });

        } else if (type === 'comm') {
            if (!CommunityAutoComplete) {res.json({status: 0}); return;}
            CommunityAutoComplete.getResults(keyword, function (err, words) {
                if (err) {
                    console.log(err);
                    res.json({status: 0});
                } else {
                    // loop the change format
                    var output = [];
                    for (var i = 0; i < words.length; i++) {
                        output.push({display: words[i].word, value: hashids.encodeHex(words[i].data[0])});
                    }
                    res.json({status: 1, results: output});
                }
            });

        } else if (type === 'user') {
            if (!UserAutoComplete) {res.json({status: 0}); return;}
            UserAutoComplete.getResults(keyword, function (err, words) {
                if (err) {
                    console.log(err);
                    res.json({status: 0});
                } else {
                    // loop the change format
                    var output = [];
                    for (var i = 0; i < words.length; i++) {
                        output.push({display: words[i].word, value: hashids.encodeHex(words[i].data[0])});
                    }
                    res.json({status: 1, results: output});
                }
            });

        }
    });


    app.post('/search/all', function(req, res) {
        // input
        var keyword = req.body.keyword;
        // vars
        var usersdata = [];
        var communitiesdata = [];
        var tagsdata = [];
        var formsdata = [];

        // promises
        var mainpromise = [];

        // functions
        var tempUserSearch = function(keyword) {
            var searchtempoutput = [];
            var networkpromise = [];

            return new Promise(function (resolve, reject) {
                // do the search
                UserModel.find({'searchname': {'$regex' : keyword, '$options' : 'ig'}}, function (err, words) {
                    if (err) {
                        reject();

                    } else {
                        if (words) {
                            // loop the change format
                            for (var i = 0; i < words.length; i++) {
                                var current = words[i];
                                // console.log(current._id);
                                searchtempoutput.push(current._id);
                            }
                            resolve();

                        } else {
                            resolve();
                        }

                    }
                });
            })
                .then(function () {
                    // query username and link of the person's network
                    var tempfunctionnetwork = function (x) {
                        return new Promise(function (resolve, reject) {
                            UserModel.findById(x, function (err, user) {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                } else {
                                    if (user) {
                                        usersdata.push({
                                            name: user.name.first + " " + user.name.last,
                                            id: hashids.encodeHex(user._id),
                                            fb: user.facebookID,
                                            pic: user.pic,
                                            gender: user.gender
                                        });
                                    }
                                    resolve();
                                }
                            });
                        });
                    };

                    searchtempoutput.forEach(function (id) {
                        networkpromise.push(tempfunctionnetwork(id));
                    });

                    return Promise.all(networkpromise).then(function () {
                        // console.log(usersdata);
                    });
                });
        };

        var tempCommSearch = function(keyword) {
            var searchtempoutput = [];
            var commpromise = [];

            return new Promise(function (resolve, reject) {
                //
                GroupModel.find({'title': {'$regex' : keyword, '$options' : 'ig'}}, function (err, words) {
                    if (err) {
                        reject();

                    } else {
                        if (words) {
                            // loop the change format
                            for (var i = 0; i < words.length; i++) {
                                var current = words[i];
                                // console.log(current._id);
                                searchtempoutput.push(current._id);
                            }
                            resolve();

                        } else {
                            resolve();
                        }

                    }
                });
            })
                .then(function () {
                    // query username and link of the person's network
                    var tempfunctioncomm = function (x) {
                        return new Promise(function (resolve, reject) {
                            GroupModel.findById(x, function (err, comm) {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (comm) {
                                        communitiesdata.push({
                                            title: comm.title,
                                            id: hashids.encodeHex(comm._id),
                                            pic: comm.pic
                                        });
                                    }
                                    resolve();
                                }
                            });
                        });
                    };

                    searchtempoutput.forEach(function (id) {
                        commpromise.push(tempfunctioncomm(id));
                    });

                    return Promise.all(commpromise).then(function () {

                    });
                });
        };

        var tempFormSearch = function(keyword) {
            var searchtempoutput = [];
            var formpromise = [];

            return new Promise(function (resolve, reject) {
                //
                PostModel.find({'public': true, 'shared': true, 'title': {'$regex' : keyword, '$options' : 'ig'}}, function (err, words) {
                    if (err) {
                        reject();

                    } else {
                        if (words) {
                            // loop the change format
                            for (var i = 0; i < words.length; i++) {
                                var current = words[i];
                                console.log(current._id);
                                searchtempoutput.push(current._id);
                            }
                            resolve();

                        } else {
                            resolve();
                        }

                    }
                });
            })
                .then(function () {
                    // query username and link of the person's network
                    var tempfunctionform = function (x) {
                        return new Promise(function (resolve, reject) {
                            PostModel.findById(x, function (err, form) {
                                if (err) {
                                    reject(err);
                                } else {
                                    if (form) {
                                        formsdata.push({
                                            title: form.title,
                                            id: hashids.encodeHex(form._id)
                                        });
                                    }
                                    resolve();
                                }
                            });
                        });
                    };

                    searchtempoutput.forEach(function (id) {
                        formpromise.push(tempfunctionform(id));
                    });

                    return Promise.all(formpromise).then(function () {

                    });
                });
        };

        var tempTagSearch = function(keyword) {
            return new Promise(function (resolve, reject) {
                TagsAutoComplete.getResults(keyword, function (err, words) {
                    if (err) {
                        if (err === "No Matches") {
                            resolve();
                        } else {
                            reject();
                        }

                    } else {
                        // loop the change format
                        for (var i = 0; i < words.length; i++) {
                            tagsdata.push(words[i].word);
                        }
                        resolve();
                    }
                });
            });
        };

        // execute promises
        mainpromise.push(tempUserSearch(keyword));
        mainpromise.push(tempCommSearch(keyword));
        mainpromise.push(tempFormSearch(keyword));
        mainpromise.push(tempTagSearch(keyword));

        return Promise.all(mainpromise).then(function () {
            res.json({
                status: 1,
                users: usersdata,
                communities: communitiesdata,
                forms: formsdata,
                tags: tagsdata
            });
        })
            .catch(function() {
                res.json({
                    status: 0
                });
            });

    });

};
