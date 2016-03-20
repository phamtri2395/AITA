/**
 * Capheshift 2016
 * Author: Tw
 */

var keystone = require('keystone');

exports = module.exports = {
	get: function(req, res) {
		var view = new keystone.View(req, res);

		view.on('init', function(next) {
			next();
		});

		view.render('upload');
	},

	post: function(req, res, next) {
		res.send('ok');
	}
};
