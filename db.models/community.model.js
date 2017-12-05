var mongoose = require('mongoose');
var random = require('mongoose-random');
var Schema = mongoose.Schema;

var CommunitySchema = new Schema({
    adminuserid: [{type: String}],
    title: String,
    hashtags: [{type: String}],
    public: Boolean,
    description: String,
    timestamp: String,
    pic: String,
    report: Object,
    members: [{type: String}]
});

CommunitySchema.plugin(random, { path: 'r' });

// Compile model from schema
module.exports = mongoose.model('CommunityModel', CommunitySchema );




