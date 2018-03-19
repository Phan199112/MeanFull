var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReactionsSchema = new Schema({
    userid: String,
    formid: String,
    reaction: String,
    timestamp: String
});

// Compile model from schema
module.exports = mongoose.model('ReactionsModel', ReactionsSchema );
