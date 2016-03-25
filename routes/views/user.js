var keystone = require('keystone');
var handlebars = require('handlebars');
var helpFunction = require('../helpers/helpFunctions.js');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// Init locals's data
	locals.data = {
		posts: []
	};

	// Get user's id
	if (req.user) {
		locals.user = req.user;
		var id = locals.user._id;
	}
	else {
		res.redirect('/login');
		return;
	}

	// Load all posts with user's id
	view.on('init', function(next) {

		keystone.list('Post').model.find({ 'author' : id }).populate('author district type ward').exec(function(err, results) {
			if (!results) {
				return;
			}

			locals.data.posts = results;
				
			keystone.list('Post').model.count().exec(function(err, count) {
				locals.data.posts.postCount = count;
				next(err);
			});										
		});
	});	

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'user';
	
	// Register isActive function, which determine which post is activing
	handlebars.registerHelper('isActive', function(activeDate) {
		if (activeDate) {
			var minus = new Date(Date.now());
			minus.setDate(minus.getDate() - helpFunction.EXPIRE_PERIOD);
			return ((activeDate >= minus) && (activeDate <= Date.now()));
		}
		else {
			return false;
		}
	});

	// Render the view
	view.render('user');
	
};
