var _ = require('lodash');
var keystone = require('keystone');
var PostModel = keystone.list('Post').model;

exports = module.exports = _.assign(PostModel, {
	add: function(req, res) {
		PostModel.create(req.body).then(function(data) {
			console.log('success', data);
			res.redirect('/');
		}, function(err) {
			console.log('error', err);
		});
	}
});
