/**
 * Author: Tw
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

var ImageModel = new keystone.List('ImageModel');

ImageModel.add({

	postId: {
		type: Types.Relationship,
		ref: 'Post',
	},

	fieldname: {
		type: String
	},

	originalname: {
		type: String
	},

	name: {
		type: String
	},

	encoding: {
		type: String
	},

	mimetype: {
		type: String
	},

	path: {
		type: String
	},

	extension: {
		type: String
	},

	size: {
		type: Number
	},

	truncated: {
		type: Boolean
	},

	serverPath: {
		type: String
	},

	createdDate: {
		label: 'Ngày tạo',
		type: Types.Datetime,
		index: true,
		value: Date.now
	},
});

ImageModel.register();
