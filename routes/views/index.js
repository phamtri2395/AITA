/**
 * Capheshift 2016
 * Author: Tw
 */

var keystone = require('keystone');
var async = require('async');
var helpFunction = require('../helpers/helpFunctions.js');
var debug = require('debug')('index');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	var section = req.url.substr(1, req.url.length);
	var categoryMapper = {
		'nha-rieng': 'nha',
		'can-ho': 'can-ho',
		'phong': 'phong'
	};
	
	locals.user = req.user;
	// locals.section is used to set the currently selected
	// item in the header navigation.
	if (section.length === 0) {
		section = 'nha-rieng';
	}
	locals.section = section;
	debug('req', locals.section);
	
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

		keystone.list('Post').model.find({
			realEstate: categoryMapper[section],
			activeDate: {
				$gte:helpFunction.minusDays(Date.now(), helpFunction.EXPIRE_PERIOD),
				$lte:Date.now()
			}}).
			populate('author').sort('publishedDate').exec(function(err, results) {
			
			if (err || !results.length) {
				console.log('NO RESULT');
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

	// Render the view
	view.render('index', { layout: 'index' });
	
};
