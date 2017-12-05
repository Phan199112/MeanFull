var TagsModel = require('../db.models/tags.model');
var UserModel = require('../db.models/user.model');
var CommunityModel = require('../db.models/community.model');
var autocomplete = require('../modules/mongoose-in-memory-autocomplete-multiple/main');

// expose this function to our app using module.exports
module.exports = function(app, passport, manager, hashids) {

    var TagsAutoComplete;
    var CommunityAutoComplete;
    var UserAutoComplete;

    app.post('/search', function (req, res) {
        var keyword = req.body.keyword;
        var type = req.body.type;

        if (type == 'tag') {
            var configurationTag = {
                //Fields being autocompleted, they will be concatenated
                autoCompleteFields: ["tag"],
                //Returned data with autocompleted results
                dataFields: ["count"],
                //Maximum number of results to return with an autocomplete request
                maximumResults: 10,
                //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
                model: TagsModel
            };

            if (!TagsAutoComplete) {
                TagsAutoComplete = new autocomplete.AutoComplete(configurationTag, function () {
                    //any calls required after the initialization
                    console.log("Tags Loaded " + TagsAutoComplete.getCacheSize() + " words in auto complete");
                });
            }

            TagsAutoComplete.getResults(keyword, function (err, words) {
                if (err) {
                    console.log(err);
                    res.json({status: 0});
                } else {
                    res.json({status: 1, results: words});
                }
            });

        } else if (type == 'comm') {
            var configurationCommunity = {
                //Fields being autocompleted, they will be concatenated
                autoCompleteFields: ["title"],
                //Returned data with autocompleted results
                dataFields: ["_id"],
                //Maximum number of results to return with an autocomplete request
                maximumResults: 10,
                //MongoDB model (defined earlier) that will be used for autoCompleteFields and dataFields
                model: CommunityModel
            };

            if (!CommunityAutoComplete) {
                CommunityAutoComplete = new autocomplete.AutoComplete(configurationCommunity, function () {
                    //any calls required after the initialization
                    console.log("Community Loaded " + CommunityAutoComplete.getCacheSize() + " words in auto complete");
                });
            }

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

        } else if (type == 'user') {
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

            if (!UserAutoComplete) {
                UserAutoComplete = new autocomplete.AutoComplete(configurationUser, function () {
                    //any calls required after the initialization
                    console.log("User Loaded " + UserAutoComplete.getCacheSize() + " words in auto complete");
                });
            }

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

};

