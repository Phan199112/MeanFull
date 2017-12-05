var CommunityModel = require('../db.models/community.model');

exports.commPublic  = function commPublic(x) {
    return new Promise(function(resolve, reject){
        CommunityModel.findById(x, function (err, comminfo) {
            if (err) {
                reject(err);
            } else {
                if (comminfo) {
                    resolve(comminfo.public);
                } else {
                    resolve(false);
                }
            }
        });
    });
};

// this function will test whether a user is a member or admin
exports.commMember = function commMember(x,y) {
    return new Promise(function(resolve, reject){
        CommunityModel.findById(x, function (err, comminfo) {
            if (err) {
                reject(err);
            } else {
                if (comminfo) {
                    if (comminfo.members.indexOf(y) >= 0) {
                        resolve(true);

                    } else if (comminfo.adminuserid.indexOf(y) >= 0) {
                        resolve(true);

                    } else {
                        resolve(false);
                    }

                } else {
                    resolve(false);
                }
            }
        });
    });
};

// this function will test whether a user is a member
exports.commAdmin = function commAdmin(x,y) {
    return new Promise(function(resolve, reject){
        CommunityModel.findById(x, function (err, comminfo) {
            if (err) {
                reject(err);
            } else {
                if (comminfo) {
                    if (comminfo.adminuserid.indexOf(y) >= 0) {
                        resolve(true);

                    } else {
                        resolve(false);
                    }

                } else {
                    resolve(false);
                }
            }
        });
    });
};
