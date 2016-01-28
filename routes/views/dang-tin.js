var keystone = require('keystone');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.user = req.user;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'dang-tin';
	locals.data = {
		districts: [{_id: 1, name: 1}, {_id: 2, name: 2}, {_id: 3, name: 3}, {_id: 4, name: 4}]
	};

	view.on('init', function(next) {
		keystone.list('District').model.find().sort('name').exec(function(err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.districts = results;

			next();
		});
	});

	// Render the view
	view.render('dang-tin');
};
