var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
    userid: String,
    message: String,
    timestamp: String
});

// Compile model from schema
module.exports = mongoose.model('FeedbackModel', FeedbackSchema );
