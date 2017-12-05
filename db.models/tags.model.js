var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagsSchema = new Schema({
    tag: String,
    count: Number
});

// Compile model from schema
module.exports = mongoose.model('TagsModel', TagsSchema );

