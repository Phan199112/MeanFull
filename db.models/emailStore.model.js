var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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
var QstnSchema = mongoose.Schema({ 
    formid: String,
    link: String,
    question: String,
    commentCount: Number,
    responseCount: Number
});



var EmailStoreSchema = new Schema({
    userid: String,
    network: [NetSchema],
    community: [CommSchema],
    questions: [QstnSchema]
});

// Compile model from schema
module.exports = mongoose.model('EmailStore', EmailStoreSchema );
