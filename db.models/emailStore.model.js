var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Sub Schemas
var NetSchema = mongoose.Schema({ 
    name: String,
    pic: String,
    link: String
});

var CommSchema = mongoose.Schema({ 
    senderName: String,
    link: String,
    communityPic: String,
    communityTitle: String
});

var QuestionResponseProfileSchema = mongoose.Schema({
    profilePic: String,
    name: String
});

var QstnSchema = mongoose.Schema({ 
    formid: String,
    link: String,
    question: String,
    commentCount: Number,
    responseCount: Number,
    responseProfiles: [QuestionResponseProfileSchema],
});

var SharedSchema = mongoose.Schema({ 
    formid: String,
    link: String,
    question: String,
    senderName: String,
    senderPic: String
});



// Main Schema
var EmailStoreSchema = new Schema({
    userid: String,
    network: [NetSchema],
    community: [CommSchema],
    questions: [QstnSchema],
    shared: [SharedSchema]
});

// Compile model from schema
module.exports = mongoose.model('EmailStore', EmailStoreSchema );
