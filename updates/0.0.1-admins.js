/**
 * This script automatically creates a default Admin user when an
 * empty database is used for the first time. You can use this
 * technique to insert data into any List you have defined.
 * 
 * Alternatively, you can export a custom function for the update:
 * module.exports = function(done) { ... }
 */

exports.create = {
	User: [
		{ 'name.first': 'Tw', 'name.last': 'Admin', email: 'tam@aita.vn', password: 'qwert12345', isAdmin: true },
		{ 'name.first': 'Admin', 'name.last': 'User', email: 'admin@aita.vn', password: 'qwert12345', isAdmin: true }
	],
	District: [
		{ name: 'Quận 1' },
		{ name: 'Quận 2' },
		{ name: 'Quận 3' },
		{ name: 'Quận 4' },
		{ name: 'Quận 5' },
		{ name: 'Quận 6' },
		{ name: 'Quận 7' },
		{ name: 'Quận 8' },
		{ name: 'Quận 9' },
		{ name: 'Quận 10' },
		{ name: 'Quận 11' },
		{ name: 'Quận 12' },
		{ name: 'Quận Thủ Đức' },
		{ name: 'Quận Gò Vấp' },
		{ name: 'Quận Bình Thạnh' },
		{ name: 'Quận Tân Bình' },
		{ name: 'Quận Tân Phú' },
		{ name: 'Quận Phú Nhuận' },
		{ name: 'Quận Bình Tân' },
		{ name: 'Huyện Củ Chi' },
		{ name: 'Huyện Hóc Môn' },
		{ name: 'Huyện Bình Chánh' },
		{ name: 'Huyện Nhà Bè' },
		{ name: 'Huyện Cần Giờ' }
	],
	Ward: [
		{ name: 'Phường 1', district: '' },
		{ name: 'Phường 2', district: '' },
		{ name: 'Phường 3', district: '' },
		{ name: 'Phường 4', district: '' },
		{ name: 'Phường 5', district: '' },
		{ name: 'Phường 6', district: '' },
		{ name: 'Phường 7', district: '' },
		{ name: 'Phường 8', district: '' },
		{ name: 'Phường 9', district: '' },
		{ name: 'Phường 10', district: '' },
		{ name: 'Phường 11', district: '' },
		{ name: 'Phường 12', district: '' },
		{ name: 'Phường 13', district: '' },
		{ name: 'Phường 14', district: '' },
		{ name: 'Phường 15', district: '' },
		{ name: 'Phường 16', district: '' },
		{ name: 'Phường 17', district: '' },
		{ name: 'Phường 18', district: '' },
		{ name: 'Phường 19', district: '' },
		{ name: 'Phường 20', district: '' },
		{ name: 'Phường 21', district: '' },
		{ name: 'Phường 22', district: '' },
	]
};
/*

// This is the long-hand version of the functionality above:

var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'user@keystonejs.com', password: 'admin', name: { first: 'Admin', last: 'User' } }
];

function createAdmin(admin, done) {
	
	var newAdmin = new User.model(admin);
	
	newAdmin.isAdmin = true;
	newAdmin.save(function(err) {
		if (err) {
			console.error("Error adding admin " + admin.email + " to the database:");
			console.error(err);
		} else {
			console.log("Added admin " + admin.email + " to the database.");
		}
		done(err);
	});
	
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};

*/
