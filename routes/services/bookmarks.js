var _ = require('lodash');
var keystone = require('keystone');
var BookmarkModel = keystone.list('Bookmark').model;

exports = module.exports = _.assign(BookmarkModel, {
	add: function(req, res) {
		if (req.user) {

			BookmarkModel.findOne({ 'user': req.user._id, 'post': req.params._postId }, function(err, bookmark) {
				console.log(bookmark);
				if (!bookmark) {
					BookmarkModel.create({
						'user': req.user._id,
						'post': req.params._postId
					});			
				}
				else if (bookmark) {
					bookmark.remove();
				}
			});

		}
	}
});
