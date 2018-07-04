var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrganizationSchema = new Schema({
    name: String,
    emailDomains: [{type: String}]
});

module.exports = mongoose.model('OrganizationModel', OrganizationSchema);
