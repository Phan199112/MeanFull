var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiscussionSchema = new Schema({
    formid: String,
    userid: String,
    message: String,
    timestamp: String
});

// Compile model from schema
module.exports = mongoose.model('DiscussionModel', DiscussionSchema);

