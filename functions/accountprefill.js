var groupfunctions = require('./groups');
var GroupModel = require('../db.models/group.model');

function getPrefills () {
    return {
        "kristopherwindsor+test3@gmail.com": {
            "permission": "professor",
            "groups": [
                ["class", "kw101", "fall2018"],
                ["class", "kw102", "fall2018"],
            ]
        },
    };
};

exports.getInitialAccountRole = function (email) {
    var data = getPrefills()[email];

    return data ? data.permission : 'student';
}

exports.doGroupsPrefill = function (user) {
    var data = getPrefills()[user.email];

    var allCategories = groupfunctions.getGroupCategories();

    if (data) {
        data.groups.forEach(function (categoryGroupSession) {
            GroupModel.create(
                {
                    adminuserid: [user._id],
                    members: [user._id],
                    title: categoryGroupSession[1],
                    category: categoryGroupSession[0],
                    organization: user.organization,
                    hashtags: [],
                    public: allCategories[categoryGroupSession[0]].shouldBePublic,
                    pic: '',
                    description: '',
                    timestamp: Date.now(),
                    session: categoryGroupSession[2],
                },
                function(err, group) {
                    console.log('doGroupsPrefill', group, err);
                }
            );
        });
    }
}
