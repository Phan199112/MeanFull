var OrganizationModel = require('../db.models/organization.model');

var orgfunctions = require('../functions/organizations');
var userfunctions = require('../functions/users');

module.exports = function(app, passport, manager, hashids) {

    app.get('/organizations/mine', manager.ensureLoggedIn('/users/login'), userfunctions.ensureAuthenticatedUserInSession, function (req, res) {
        orgfunctions.getOrganization(req.session.user.organization)
        .then(function(org) {
            res.json({status: 1, organization: org});
        })
        .catch(function (err) {
            res.json({status: 0, err: err});
        });
    });

    // This is just for testing, hence the non-guessable endpoint
    app.get('/organizations/makeuclaASDF26746872', function (req, res) {
        /*
        OrganizationModel.create(
            {
                name: 'UCLA',
                emailDomains: ['anderson.ucla.edu']
            },
            function(err, k) {
                res.json({status: 1});
            }
        );
        */

        orgfunctions.getOrganizationForEmailAddress('bobbb@anderson.ucla.edu', function (err, answer) {
            res.json({err:err, answer:answer});
        });

    });
};
