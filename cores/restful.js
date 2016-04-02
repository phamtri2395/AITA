/**
 * capheshfit
 * @author Tw
 */
var utils = require('./utilities');
var debug = require('debug')('restful');

module.exports = function(bll) {
	var populateStr = '';
	if (typeof bll.getPopulateFields === 'function') {
		populateStr = bll.getPopulateFields();
	}
	debug('populate', populateStr);

	/**
	 * GET method for return only one item
	 * @return specific collection
	 * params._id
	 */
	var _get = function(req, res, next) {
		var id = req.params._id;
		debug('_get', id);

		bll.findOne({_id: id}).populate(populateStr).exec().then(
		function(data) {
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	};

	/**
	 * GET method to get all of collection
	 * @return a list collection matched with query
	 * params --
	 */
	var _all = function(req, res, next) {
		debug('_all', populateStr);

		bll.find({}).populate(populateStr).exec().then(
		function(data) {
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	};

	/**
	 * GET method
	 * @return a set of collection
	 * req.query.q - is a query request
	 * req.query.l - is a pagin request
	 */
	var _find = function(req, res, next) {
		var query = JSON.parse(req.query.q || '{}');
		var limit = JSON.parse(req.query.l || '{}');
		debug('_find query', query);
		debug('_find limit', limit);

		bll.find(query).populate(populateStr).exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		}, function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	};

	/**
	 * POST method, create a new collection
	 * @return {collection} new collection return from server
	 * req.body
	 */
	var _post = function(req, res, next) {
		var params = req.params;
		var body = req.body;
		debug('_post', params);
		debug('_post', body);

		bll.create(body).then(function(data) {
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	};

	/**
	 * PUT method to update a collection
	 * @return new collection, that returned from server
	 * params._id
	 * req.body
	 */
	var _put = function(req, res, next) {
		var id = req.params._id;
		var body = req.body;
		debug('_put', id);
		debug('_put', body);

		bll.findByIdAndUpdate(id, body).populate(populateStr).exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		}, function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	};

	/**
	 * DELETE method to delete a collection
	 * @return
	 * params._id
	 */
	var _delete = function(req, res, next) {
		var id = req.params._id;
		debug('_delete', id);

		bll.remove({_id: id}).populate(populateStr).exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		}, function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	};

	return {
		_get: _get,
		_all: _all,
		_find: _find,
		_post: _post,
		_put: _put,
		_delete: _delete
	};
};
