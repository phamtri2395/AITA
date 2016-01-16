var keystone = require('keystone');

/**
 * EstateCategory Model
 * ==================
 */

var EstateCategory = new keystone.List('EstateCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

EstateCategory.add({
	name: { type: String, required: true }
});

EstateCategory.relationship({ ref: 'Post', path: 'types' });

EstateCategory.register();
