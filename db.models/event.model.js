var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    userid: String,
    fromuser: String,
    type: String,
    message: String,
    seen: Boolean,
    acted: Boolean,
    data: Object,
    timestamp: String
});

// Compile model from schema
module.exports = mongoose.model('EventModel', EventSchema );
