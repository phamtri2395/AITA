var keystone = require('keystone');
var async = require('async');
var Handlebars = require('handlebars');
var moment = require('moment');
var async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	// locals.user = req.user;
	locals.user = req.session.passport ? req.session.passport.user : req.user;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'dang-tin';
	
	locals.data = {
		districts: [],
		filters: {},
		wards: [],
		estateCategories: []
	};

	view.on('init', function(next) {
		keystone.list('District').model.find().sort('name').exec(function(err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.districts = results;

			async.each(locals.data.districts, function(district, next) {
				keystone.list('Ward').model.find({district: district._id}).sort('name').exec(function(err, results) {
					locals.data.filters[district._id] = results;
					next();
				});
			}, function(err) {
				next(err);
			});
		});
	});

	view.on('init', function(next) {
		keystone.list('EstateCategory').model.find().sort('name').exec(function(err, results) {

			if (err || !results.length) {
				return next(err);
			}

			locals.data.estateCategories = results;
			next();
		});
	});

	Handlebars.registerHelper('getFullname', function(user) {
		return [user.name.first, user.name.last].join(' ');
	});

	Handlebars.registerHelper('currentDate', function() {
		return moment().format('YYYY-MM-DD');
	});

	Handlebars.registerHelper('json', function(districts) {
		return JSON.stringify(districts);
	});

	Handlebars.registerHelper('getWards', function(districts) {
		var wards = locals.data.filters[locals.data.districts[0]._id];
		var i = 0;
		var length = wards.length;
		var options = [];

		for (; i < length; i++) {
			options.push(['<option value="', wards[i]._id, '">', wards[i].name, '</option>'].join(''));
		}

		return new Handlebars.SafeString(options);
	});

	// Render the view
	view.render('dang-tin');
};
