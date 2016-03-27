// @capheshift 2015
// Author: tw

var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var PostModel = keystone.list('Post').model;

exports = module.exports = _.assign(restful(PostModel), {
	getOwnPost: function(req, res) {
		if (!req.user) {
			res.jsonp(utils.response(false, null, { err: 'no permision' }));
			return;
		}

		PostModel.find({ author: req.user._id }).exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	}
});
