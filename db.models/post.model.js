var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    userid: String,
    title: String,
    type: String, // ["survey", "pic", "doc", "vid", "post"]
    questions: Object,
    pic: String,
    doc: String,
    vid: String,
    reactions: Object,
    hashtags: [{type: String}],
    categories: [{type: String}],
    anonymous: Boolean,
    public: Boolean,
    shared: Boolean,
    resultsPublic: Boolean,
    sharedWithUsers: [{type: String}],
    sharedWithCommunities: [{type: String}],
    typeevent: Boolean,
    loginRequired: Boolean,
    description: String,
    expired: Boolean,
    timestamp: String,
    report: Object,
    activityEmailSent: Boolean,
    organization: String,
});

// Compile model from schema
module.exports = mongoose.model('PostModel', PostSchema );

