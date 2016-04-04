var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var DistrictsModel = keystone.list('District').model;

exports = module.exports = _.assign(restful(DistrictsModel), {
	findAll: function(req, res) {
		DistrictsModel.find().sort('name').exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		}, function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	}
});
