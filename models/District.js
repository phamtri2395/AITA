var keystone = require('keystone');

/**
 * District Model
 * ==========
 */

var District = new keystone.List('District', {
	autokey: { from: 'name', path: 'key', unique: true }
});

District.add({
	name: { type: String, required: true }
});

District.relationship({ ref: 'Post', path: 'districts' });
District.register();
