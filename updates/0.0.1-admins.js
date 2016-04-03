/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 * 
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User'),
	District = keystone.list('District'),
	Ward = keystone.list('Ward'),
	districts = require('./districts');

var admins = [
	{ email: 'admin@aita.vn', password: 'qwert12345', name: { first: 'Admin', last: 'User' } },
	{ email: 'tam@aita.vn', password: 'qwert12345', name: { first: 'Tw', last: 'Admin' } }
];

function createAdmin(admins) {
	async.each(admins, function(admin, next) {
		var newAdmin = new User.model(admin);
	
		newAdmin.isAdmin = true;
		newAdmin.save(function(err) {
			if (err) {
				console.error("Error adding admin " + admin.email + " to the database:");
				console.error(err);
			} else {
				console.log("Added admin " + admin.email + " to the database.");
			}

			next(err);
		});
	});
}

function createDistrict(districts, done) {
	async.each(districts, function(district, next) {
		var districtModel = new District.model({ name: district.name });

		districtModel.save(function(err) {
			if (err) {
				console.error('Error loading district ' + district.name + ' to the database');
				console.error(err);
			} else {
				console.log('Added district ' + district.name + ' to the database');
			}

			createWard(district.wards, districtModel._id, next);
		});
	}, function(err) {
		done(err);
	});
}

function createWard(wards, districtId, done) {
	async.each(wards, function(ward, next) {
		var wardModel = new Ward.model(ward);

		wardModel.district = districtId;
		wardModel.save(function(err) {
			if (err) {
				console.error('Error loading ward ' + ward.name + ' to the database');
				console.error(err);
			} else {
				console.log('Added ward ' + ward.name + ' to the database');
			}

			next(err);
		});
	}, function(err) {
		done(err);
	});
}

exports = module.exports = function(done) {
	createAdmin(admins);
	createDistrict(districts, done);
};

