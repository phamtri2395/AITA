var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Ward Model
 * ==========
 */

var Ward = new keystone.List('Ward');

Ward.add({
	name: {
		label: 'Phường',
		type: String,
		required: true,
	},

	district: {
		label: 'Quận',
		type: Types.Relationship,
		ref: 'District'
	}
});

Ward.defaultColumns = 'name|20%, district';
Ward.relationship({ ref: 'Post', path: 'wards' });
Ward.register();
