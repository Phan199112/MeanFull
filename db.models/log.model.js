var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
    userid: String,
    ip: String,
    action: String,
    timestamp: String
});

// Compile model from schema
module.exports = mongoose.model('LogModel', LogSchema );

