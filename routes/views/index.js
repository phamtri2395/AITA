var keystone = require('keystone');
var Handlebars = require('handlebars');
var async = require('async');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.user = req.user;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	// Init locals's data
	locals.data = {
		districts: [],
		posts: [],
		categories: [],
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

	// Register toCurrency function, which changes price to decimal format
	Handlebars.registerHelper('toCurrency', function(number) {
  		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	});
	// Register toAuthorName function, which gives full name of author
	Handlebars.registerHelper('toAuthorName', function(author) {
  		return (author) ? (author.name.first + ' ' + author.name.last) : 'null';
	});

	// Render the view
	view.render('index');
	
};
