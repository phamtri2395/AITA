var keystone = require('keystone');
var Handlebars = require('handlebars');

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
	
	// Register toCurrency function, which changes price to decimal format
	Handlebars.registerHelper('toCurrency', function(number) {
  		return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	});
	// Register toAuthorName function, which gives full name of author
	Handlebars.registerHelper('toAuthorName', function(author) {
  		return (author) ? (author.name.first + ' ' + author.name.last) : 'null';
	});
	// Register districtName function, which return name of District
	Handlebars.registerHelper('districtName', function(district) {
		return (district) ? (district.name) : 'null';
	});

	// Render the view
	view.render('user');
	
};
