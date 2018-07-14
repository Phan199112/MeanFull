var OrganizationModel = require('../db.models/organization.model');

exports.getOrganizationForEmailAddress = function (emailAddress, callback) {
    var domain = emailAddress.replace(/.*@/, "");
    OrganizationModel.findOne({emailDomains: domain}, callback);
};

exports.getOrganization = function (id) {
    return new Promise(function(resolve, reject){
        OrganizationModel.findById(id, function (err, organization) {
            if (err) {
                reject(err);
            } else {
                if (organization) {
                    resolve(organization);
                } else {
                    reject();
                }
            }
        });
    });
};
