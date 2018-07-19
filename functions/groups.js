var crypto = require('crypto');

var GroupModel = require('../db.models/group.model');

exports.getGroupCategories = function () {
    return {
        'class': {
            category: 'class', // must match key name above
            displayName: 'Class',
            displayNameShort: 'Class',
            displayNamePlural: 'Classes',
            shouldBePublic: false,
            groups: [], // this is just put here so calling code can add groups to it
        },
        'studentorg': {
            category: 'studentorg',
            displayName: 'Student Organization',
            displayNameShort: 'Student Org',
            displayNamePlural: 'Student Organizations',
            shouldBePublic: true,
            groups: [],
        },
    };
};

exports.getGroup = function (groupId) {
    return new Promise(function(resolve, reject){
        GroupModel.findById(groupId, function (err, group) {
            if (err) {
                reject(err);
            } else {
                if (comminfo) {
                    resolve(group);
                } else {
                    reject();
                }
            }
        });
    });
};

exports.groupPublic = function groupPublic(x) {
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

exports.getGroupShareToken = function (group) {
    shasum = crypto.createHash('md5');
    shasum.update(group._id + ':' + group.timestamp);
    return shasum.digest('hex').substring(0, 16);
};
