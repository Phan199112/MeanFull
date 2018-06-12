
/*
We distinguish our main actors (users, surveys, answers, etc.) from our side
effects (notifications and emailstores models; sending of email; user activity
counters).

When something happens regarding one of the main models, that event should be
published (by calling one of these functions). Then, subscribers can take action
on that event to update notification models, etc.

We want to take care to publish meaningful events.
*/

var EmailStoreModel = require('../db.models/emailStore.model');
var UserModel = require('../db.models/user.model');

var usersfunctions = require('../functions/users');
var emailstoresfunctions = require('../functions/emailstores');
var notificationsfunctions = require('../functions/notifications');

exports.friendRequestMade = function () {

};

exports.friendRequestAccepted = function () {

};

exports.friendRequestDeclined = function () {

};

exports.friendRequestCanceled = function () {

};

// Survey first created - not shared at this point
exports.surveyCreated = function () {

};

exports.surveySharedWithCommunity = function () {

};

exports.surveySharedWithUser = function () {

};

exports.surveySharedWithEmailAddress = function () {

};

exports.surveyDeleted = function (surveyId) {
    emailstoresfunctions.surveyDeleted(surveyId);
};

exports.surveyAnswered = function (userMakingCommentId, survey, hashids) {
    emailstoresfunctions.recordNewResponse(userMakingCommentId, survey, hashids);
};

exports.surveyCommentAdded = function (userMakingCommentId, survey, hashids) {
    emailstoresfunctions.recordNewComment(userMakingCommentId, survey, hashids);
};

exports.surveyCommentDeleted = function () {

};

// TODO group events

