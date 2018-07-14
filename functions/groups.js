var GroupModel = require('../db.models/group.model');

exports.groupPublic  = function groupPublic(x) {
    return new Promise(function(resolve, reject){
        GroupModel.findById(x, function (err, comminfo) {
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
exports.groupMember = function groupMember(x,y) {
    return new Promise(function(resolve, reject){
        GroupModel.findById(x, function (err, comminfo) {
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
exports.groupAdmin = function groupAdmin(x,y) {
    return new Promise(function(resolve, reject){
        GroupModel.findById(x, function (err, comminfo) {
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
