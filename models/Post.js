var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: {
		type: String,
		required: true
	},

	district: {
		type: Types.Relationship,
		ref: 'District',
		required: true,
		default: true
	},

	ward: {
		type: Types.Relationship,
		ref: 'Ward',
		required: true,
		default: true
	},

	street: {
		type: String,
		required: false
	},

	price: {
		type: Number,
		required: false
	},

	area: {
		type: Number,
		required: false
	},

	bedroom: {
		type: String,
		required: false
	},

	bathroom: {
		type: String,
		required: false
	},

	type: {
		type: Types.Select,
		required: false,
		options: 'Phòng cho thuê, Căn hộ chung cư, Nhà riêng',
		emptyOption: false,
		default: 'Phòng cho thuê'
	},

	address: {
		type: String,
		required: false
	},

	hidePosition: {
		type: Boolean,
		required: false
	},

	description: {
		type: Types.Html,
		wysiwyg: true,
		height: 400
	},

	floors: {
		type: Number,
		required: false
	},

	highway: {
		type: String,
		required: false
	},

	yearBuild: {
		type: Number,
		required: false
	},

	quarter: {
		type: String,
		required: false
	},

	name: {
		type: String,
		required: false
	},

	mobile: {
		type: Number,
		required: false
	},

	medium: {
		type: Boolean,
		required: false
	},

	state: {
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'draft',
		index: true
	},

	author: {
		type: Types.Relationship,
		ref: 'User',
		index: true
	},

	publishedDate: {
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published'
		}
	},

	image: {
		type: Types.CloudinaryImage
	},

	categories: {
		type: Types.Relationship,
		ref: 'PostCategory',
		many: true
	}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
