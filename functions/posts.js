
var PostModel = require('../db.models/post.model');

// provides the correct filter object to get the posts matching the input requirements
exports.getPostFilterFor = function (organizationId	, userId, groupId, tag, authenticatedUserId) {
	var filter = {organization: organizationId};

	if (!userId && !groupId && !tag) {
		filter.public = true;
		filter.shared = true;
	}

	if (userId) {
		filter.userid = userId;
		if (userId != authenticatedUserId) {
			filter.public = true;
			filter.shared = true;
		}
	}

	if (groupId) {
		filter.shared = true;
		filter.sharedWithCommunities = groupId;
	}

	if (tag) {
		filter.hashtags = tag;
	}

	return filter;
};
