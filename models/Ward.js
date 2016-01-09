var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Ward Model
 * ==========
 */

var Ward = new keystone.List('Ward', {
	autokey: { from: 'name', path: 'key', unique: true }
});

Ward.add({
	name: {
		type: String,
		required: true,
	},

	district: {
		type: Types.Relationship,
		ref: 'District',
		many: true
	}
});

Ward.relationship({ ref: 'Post', path: 'wards' });
Ward.register();
