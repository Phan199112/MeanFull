var OrganizationModel = require('../db.models/organization.model');

var orgfunctions = require('../functions/organizations');

module.exports = function(app, passport, manager, hashids) {

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
