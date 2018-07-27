
var PostModel = require('../db.models/post.model');

// provides the correct filter object to get the posts matching the input requirements
exports.getPostFilterFor = function (organizationId , userId, groupId, tag, authenticatedUserId) {
    // All posts are filtered by organization.
    var filter = {organization: organizationId};

    // If one of these fields are given, user only sees posts they have access to
    if (!userId && !groupId) {
        filter.public = true;
        filter.shared = true;
    }

    if (userId) {
        filter.userid = userId;
        // See only permitted posts
        if (userId != authenticatedUserId) {
            filter.public = true;
            filter.shared = true;
        }
    }

    if (groupId) {
        filter.shared = true;
        // Can be one ID or an array of IDs
        if (groupId.constructor === Array) {
            filter.sharedWithCommunities = {"$in": groupId};
        } else {
            filter.sharedWithCommunities = groupId;
        }
    }

    if (tag) {
        filter.hashtags = tag;
    }

    return filter;
};
