/**
 * Aita 2016
 * Author: Tri
 */

var keystone = require('keystone');
var async = require('async');
var debug = require('debug')('chi-tiet');
// var async = require('async');

exports = module.exports = function(req, res) {
	console.log('params', req.params._id);

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.user = req.user;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'chi-tiet';

	locals.user = req.user;
	// Init locals's data
	locals.data = {
		post: {},
		relatedPosts: [],
		bookmarks: []
	};

	// Get Id from index
	var id = req.params._id;
	debug('id', id);
	// Store type & category of post
	var type;
	
	// Load post with Id
	view.on('init', function(next) {

		keystone.list('Post').model.findOne({ '_id' : id }).populate('author district ward').exec(function(err, result) {
			if (!result) {
				return;
			}

			locals.data.post = result;

			// add meta data for detail page
			var imagePath = 'http://aita.vn/favicon.ico';
			if (result.images && result.images.length > 0) {
				var t = result.images[0];
				imagePath =  'http://' + t.serverPath + '/' + t.path;
			}
			locals.meta = {
				title: 'Aita.vn - ' + result.title,
				description: 'Bạn có nhà, căn hộ, hay phòng cần bán hay cho thuê, hãy sử dụng aita để đạt được độ phủ lớn nhất.',
				image: imagePath
			};

			type = result.type;
			debug('data', result);
			debug('type', type);

			keystone.list('Post').model.count().exec(function(err, count) {
				locals.data.post.postCount = count;
				debug('count', count);
				next(err);
			});
		});
		
	});

	// Load related posts
	view.on('init', function(next) {
		debug('mid2 type', type);

		keystone.list('Post').model
		.find({ 
			'type': type
		})
		.where('_id').ne(locals.data.post._id)
		.populate('author district ward')
		.limit(2)
		.sort({'activeDate': -1})
		.exec(function(err, results) {

			if (!results) {
				return;
			}

			locals.data.relatedPosts = results;

			return next(err);
		});
	});

	// Load all Bookmarks
	if (locals.user) {
		view.on('init', function(next) {
			keystone.list('Bookmark').model.find({ user: locals.user._id }).exec(function(err, results) {
				if (err || !results.length) {
					return next(err);
				}
				locals.data.bookmarks = results;

				// Load the counts for each bookmark
				async.each(locals.data.bookmarks, function(bookmark, next) {
					keystone.list('Bookmark').model.count().exec(function(err, count) {
						bookmark.postCount = count;
						next(err);
					});
				}, function(err) {
					next(err);
				});
			});
		});
	}

	// Render the view
	view.render('chi-tiet');
};
