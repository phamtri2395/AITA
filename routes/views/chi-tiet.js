var keystone = require('keystone');
var Handlebars = require('handlebars');

exports = module.exports = function(req, res) {
	console.log('params', req.params._id);

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.user = req.user;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'chi-tiet';

	// Init locals's data
	locals.data = {
		post: {},
	};

	// Get Id from index
	var id = req.params._id;
	// if (!id) {
	// 	return;
	// }
	
	// Load post with Id
	view.on('init', function(next) {

		keystone.list('Post').model.findOne({ '_id' : id }).populate('author district type ward').exec(function(err, results) {
			if (!results) {
				return;
			}

			locals.data.post = results;
				
			keystone.list('Post').model.count().exec(function(err, count) {
				locals.data.post.postCount = count;
				next(err);
			});
										
			// console.log('THIS IS DATA: ', locals.data.post);
		});
		
	});	

	// Register toCurrency function, which changes price to decimal format
	Handlebars.registerHelper('toCurrency', function(number) {
		return (number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') + ' VND');
	});
	// Register toAuthorName function, which gives full name of author
	Handlebars.registerHelper('toAuthorName', function(author) {
		return (author) ? (author.name.first + ' ' + author.name.last) : 'null';
	});
	// Register districtName function, which return name of District
	Handlebars.registerHelper('districtName', function(district) {
		return (district) ? (district.name) : 'null';
	});
	// Register typeName function, which return name of Type
	Handlebars.registerHelper('typeName', function(type) {
		return (type) ? (type.name) : 'null';
	});
	// Register isMedium function
	Handlebars.registerHelper('isMedium', function(medium) {
		return (medium) ? 'Tiếp' : 'Không Tiếp';
	});

	// Render the view
	view.render('chi-tiet');
};
