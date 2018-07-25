var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
    adminuserid: [{type: String}],
    title: String,
    category: String,
    hashtags: [{type: String}],
    public: Boolean,
    description: String,
    timestamp: String,
    pic: String,
    report: Object,
    members: [{type: String}],
    requests: [{type: String}],
    organization: String,
    session: String,
    classdata: Object,
}, {usePushEach: true});

GroupSchema.plugin(random, { path: 'r' });

// Compile model from schema
module.exports = mongoose.model('GroupModel', GroupSchema );
