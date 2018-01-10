var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FormSchema = new Schema({
    userid: String,
    title: String,
    questions: Object,
    hashtags: [{type: String}],
    anonymous: Boolean,
    public: Boolean,
    shared: Boolean,
    resultsPublic: Boolean,
    sharedWithUsers: [{type: String}],
    sharedWithCommunities: [{type: String}],
    expires: Object,
    typeevent: Boolean,
    loginRequired: Boolean,
    description: String,
    expired: Boolean,
    timestamp: String,
    report: Object
});

// Compile model from schema
module.exports = mongoose.model('FormModel', FormSchema );

