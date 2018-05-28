
var EmailStoreModel = require('../db.models/emailStore.model');
var UserModel = require('../db.models/user.model');

var usersfunctions = require('../functions/users');

/**
 * Updates emailstores when a response or comment is made
 * userMakingCommentId - user ID or null for anonymous
 * survey - form model
 * counterField - "responseCount" or "commentCount"
 * hashids - a dependency
 */
function recordNewResponseOrComment(userMakingCommentId, survey, counterField, hashids) {

    var userMakingComment = null, emailStoreSurveyItem = null;

    Promise
    .all([
        new Promise(function (resolve, reject) {
            if (userMakingCommentId === null) {
                resolve();
            } else {
                UserModel.findById(userMakingCommentId, function (err, result) {
                    if (err) {
                        reject();
                    } else {
                        userMakingComment = result;
                        resolve();
                    }
                });
            }
        }),
        new Promise(function (resolve, reject) {
            UserModel.findById(survey.userid, function (err, result) {
                if (err) reject(); else resolve();
            });
        }),
        new Promise(function (resolve, reject) {
            EmailStoreModel.findOne({ userid: survey.userid }, function (err, result) {
                if (err) {
                    reject();
                } else if (result) {
                    // If the email store already has data for this question, remove it
                    var qInd = result.questions.findIndex(q => q.formid == survey._id);
                    if (qInd != -1) {
                        emailStoreSurveyItem = result.questions[qInd];
                        EmailStoreModel.update(
                            {'_id': result._id}, 
                            { $pull: { "questions" : { formid: survey._id } } },
                            function (err, result) {
                                if (err) reject(); else resolve();
                            }
                        );
                    } else {
                        // OK as-is: EmailStore exists but EmailStore.questions item does not
                        resolve();
                    }
                } else {
                    // Need to create the email store
                    EmailStoreModel.create({
                        userid: survey.userid,
                        questions: [],
                        community: [],
                        network: [],
                        shared: []
                    }, function (err, k) {
                        if (err) reject(); else resolve();
                    });
                }
            });
        }),
    ])
    .then(function () {
        // At this point, the EmailStore exists in DB, but the EmailStore.questions item does not
        // We will compute the new item then append it to EmailStore.questions in the DB

        if (!emailStoreSurveyItem) {
            emailStoreSurveyItem = {
                formid: survey._id,
                question: survey.questions[0].body,
                commentCount: 0,
                responseCount: 0,
                link: "https://www.questionsly.com/feed;survey=" + hashids.encodeHex(survey._id),
                responseProfiles: []
            };
        }

        // Most important part

        emailStoreSurveyItem[counterField] ++;

        if (userMakingComment) {
            var userMakingCommentName = userMakingComment.name.first + " " + userMakingComment.name.last;
            var profileIndex = emailStoreSurveyItem.responseProfiles.findIndex(i => i.name == userMakingCommentName);
            if (profileIndex == -1) {
                emailStoreSurveyItem.responseProfiles.push({
                    name: userMakingCommentName,
                    profilePic: usersfunctions.getProfilePic(userMakingComment),
                });
            }
        }

        return new Promise(function (resolve, reject) {
            EmailStoreModel.update(
                {userid: survey.userid, "questions.formid" : {$ne : survey._id }},
                {$addToSet : {"questions" : emailStoreSurveyItem}},
                function (err, result) {
                    if (err) reject(); else resolve();
                }
            );
        });
    })
    .then(function () {
    })
    .catch(err => {
        console.log("recordNewResponseOrComment failed", err);
    });
}

exports.recordNewResponse = function recordNewComment(userMakingCommentId, survey, hashids) {
    recordNewResponseOrComment(userMakingCommentId, survey, 'responseCount', hashids);
};

exports.recordNewComment = function recordNewComment(userMakingCommentId, survey, hashids) {
    recordNewResponseOrComment(userMakingCommentId, survey, 'commentCount', hashids);
};
