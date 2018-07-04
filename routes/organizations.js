var OrganizationModel = require('../db.models/organization.model');

module.exports = function(app, passport, manager, hashids) {

    // This is just for testing, hence the non-guessable endpoint
    app.get('/organizations/makeuclaASDF26746872', function (req, res) {
        // mongodb
        OrganizationModel.create(
            {
                name: 'UCLA',
                emailDomains: ['anderson.ucla.edu']
            },
            function(err, k) {
                res.json({status: 1});
            }
        );
    });
};
