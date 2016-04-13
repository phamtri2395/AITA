/**
 * Aita 2016
 */

var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var UserModel = keystone.list('User').model;

exports = module.exports = _.assign(restful(UserModel), {
	_get: function(req, res) {
		if (!req.user) {
			res.jsonp(utils.response(false, null, { err: 'no permision' }));
			return;
		}

		UserModel.findOne({_id: req.user._id }).exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	},

	_put: function(req, res) {
		var id = req.user._id;
		var body = req.body;

		if (!req.user) {
			res.jsonp(utils.response(false, null, { err: 'no permision' }));
			return;
		}

		UserModel.findByIdAndUpdate(id, body).exec().then(function(data) {
			console.log('DATA');
			console.log(data);
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			console.log('ERRORS');
			console.log(err);
			res.jsonp(utils.response(false, null, err));
		});		
	}
});
