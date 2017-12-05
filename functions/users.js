var UserModel = require('../db.models/user.model');

exports.profilePublic  = function profilePublic(x) {
    return new Promise(function(resolve, reject){
        UserModel.findById(x, function (err, userinfo) {
            if (err) {
                reject(err);
            } else {
                if (userinfo) {
                    resolve(userinfo.public);
                } else {
                    resolve(false);
                }
            }
        });
    });
};
