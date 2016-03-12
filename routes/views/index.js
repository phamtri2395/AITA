var keystone = require('keystone');
var Handlebars = require('handlebars');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.user = req.user;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	var section = req.url.substr(1, req.url.length);
	if (section.length === 0) {
		section = 'nha-rieng';
	}
	locals.section = section;
	console.log('req', locals.section);
	
	// Init locals's data
	locals.data = {
		districts: [],
		posts: [],
		categories: [],
		bookmarks: []
	};

	// Load all categories
	view.on('init', function(next) {
		keystone.list('Category').model.find().sort('name').exec(function(err, results) {
			if (err || !results.length) {
				return next(err);
			}
			locals.data.categories = results;

			// Load the counts for each category
			async.each(locals.data.categories, function(category, next) {
				keystone.list('Category').model.count().exec(function(err, count) {
					category.postCount = count;
					next(err);
				});
			}, function(err) {
				next(err);
			});
		});
	});

	// Load all districts
	view.on('init', function(next) {
		
		keystone.list('District').model.find().sort('name').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.districts = results;

			// Load the counts for each district
			async.each(locals.data.districts, function(district, next) {
				
				keystone.list('District').model.count().exec(function(err, count) {
					district.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
						
		});
		
	});

	// Load all posts
	view.on('init', function(next) {

		keystone.list('Post').model.find().populate('author').sort('publishedDate').exec(function(err, results) {
			
			if (err || !results.length) {
				return next(err);
			}
			
			locals.data.posts = results;

			// Load the counts for each post
			async.each(locals.data.posts, function(post, next) {
				
				keystone.list('Post').model.count().exec(function(err, count) {
					post.postCount = count;
					next(err);
				});
				
			}, function(err) {
				next(err);
			});
						
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

	// Register toCurrency function, which changes price to decimal format
	Handlebars.registerHelper('toCurrency', function(number) {
  		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	});
	// Register toAuthorName function, which gives full name of author
	Handlebars.registerHelper('toAuthorName', function(author) {
  		return (author) ? (author.name.first + ' ' + author.name.last) : 'null';
	});
	// Check if Bookmarked
	Handlebars.registerHelper('isBookmarked', function(id) {
			var flag = false;

  		for (var i = 0; i < locals.data.bookmarks.length; i++) {
  			if (id.toString() == locals.data.bookmarks[i].post.toString()) {
  				flag = true;
  				break;
  			}
  		}

  		return flag;
	});

	// Render the view
	view.render('index', { layout: 'index' });
	
};
