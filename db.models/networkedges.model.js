var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NetworkEdgesSchema = new Schema({
    userid: [String],
    status: Boolean,
    timestamp: String
});

// Compile model from schema
module.exports = mongoose.model('NetworkEdgesModel', NetworkEdgesSchema );

