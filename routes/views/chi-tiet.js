/**
 * Aita 2016
 * Author: Tri
 */

var keystone = require('keystone');
var async = require('async');
var helpFunction = require('../helpers/helpFunctions.js');

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
		relatedPosts: []
	};

	// Get Id from index
	var id = req.params._id;
	// Store type & category of post
	var type;
	
	// Load post with Id
	view.on('init', function(next) {

		keystone.list('Post').model.findOne({ '_id' : id }).populate('author district type ward').exec(function(err, result) {
			if (!result) {
				return;
			}

			locals.data.post = result;
			type = result.type;

			keystone.list('Post').model.count().exec(function(err, count) {
				locals.data.post.postCount = count;
				next(err);
			});

		});
		
	});

	// Load related posts
	view.on('init', function(next) {

		keystone.list('Post').model.find({ 'type': type,
			'activeDate': {
				$gte:helpFunction.minusDays(Date.now(), helpFunction.EXPIRE_PERIOD),
				$lte:Date.now()
			}}).
			where('_id').ne(locals.data.post._id).
				populate('author district type ward').
					limit(3).
						sort({'publishedDate': -1}).
							exec(function(err, results) {
			
			if (!results) {
				return;
			}

			locals.data.relatedPosts = results;

			return next(err);
		});
	
	});

	// Render the view
	view.render('chi-tiet');
};
