var _ = require('lodash');
var keystone = require('keystone');
var BookmarkModel = keystone.list('Bookmark').model;
var PostModel = keystone.list('Post').model;

exports.bookmark = function(req, res) {
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
};

exports.reactivate = function(req, res) {
	if (req.user) {

		PostModel.findOne({ 'author': req.user._id, '_id': req.params._postId }, function(err, post) {
			if (err) return console.log(err);

			if (post) {
				post.activeDate = Date.now();
				post.save(function(err) {
					if (err)
						console.log(err);
					else
						console.log('Successful update active Date!');
				});
			}
			else {
				res.redirect('/');
			}
		});

	}
};
