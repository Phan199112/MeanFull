var OrganizationModel = require('../db.models/organization.model');

exports.getOrganizationForEmailAddress = function (emailAddress, callback) {
    var domain = emailAddress.replace(/.*@/, "");
    OrganizationModel.findOne({emailDomains: domain}, callback);
};
