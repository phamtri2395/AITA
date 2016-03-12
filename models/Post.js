// @aita 2016
// @author: tw

var keystone = require('keystone');
var Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: {
		label: 'Tiêu đề',
		type: String,
		required: true
	},

	type: {
		label: 'Hình thức (cho thuê/bán)',
		type: Types.Relationship,
		ref: 'EstateCategory',
		required: false
	},

	district: {
		label: 'Quận',
		type: Types.Relationship,
		ref: 'District',
		default: true
	},

	ward: {
		label: 'Phường',
		type: Types.Relationship,
		ref: 'Ward',
		default: true
	},

	street: {
		label: 'Đường',
		type: String,
		required: false
	},

	address: {
		label: 'Địa chỉ',
		type: String,
		required: false
	},

	isFront: {
		label: 'Là mặt tiền',
		type: Boolean,
		required: false
	},

	hidePosition: {
		label: 'Ẩn vị trí',
		type: Boolean,
		required: false
	},

	latitude: {
		label: 'Vĩ độ',
		type: Number,
		required: false,
		default: 0
	},	

	longitude: {
		label: 'Kinh độ',
		type: Number,
		required: false,
		default: 0
	},	

	price: {
		label: 'Giá (VNĐ)',
		type: Number,
		required: false
	},

	area: {
		label: 'Diện tích (m2)',
		type: Number,
		required: true,
		default: 25
	},

	bedroom: {
		label: 'Số phòng ngủ',
		type: Number,
		required: true,
		default: 2
	},

	bathroom: {
		label: 'Số phòng tắm',
		type: Number,
		required: true,
		default: 1
	},

	floors: {
		label: 'Tầng',
		type: Number,
		required: false
	},

	highway: {
		label: 'Mặt đường (m)',
		type: Number,
		required: false
	},

	yearBuild: {
		label: 'Năm xây dựng',
		type: Number,
		required: false
	},

	description: {
		label: 'Mô tả',
		type: Types.Textarea,
		wysiwyg: false,
		height: 200
	},

	isProject: {
		label: 'Nằm trong dự án',
		type: Boolean,
		required: false
	},

	project: {
		label: 'Tên dự án',
		type: String,
		required: false
	},

	projectLink: {
		label: 'Link mô tả dự án',
		type: Types.Url,
		required: false
	},

	name: {
		label: 'Tên người đăng',
		type: String,
		required: false
	},

	mobile: {
		label: 'Số điện thoại',
		type: String,
		required: false
	},

	// medium: {
	// 	label: 'Trung bình',
	// 	type: Boolean,
	// 	required: false
	// },

	pushAds: {
		label: 'Chạy quảng cáo',
		type: Boolean,
		default: false
	},

	state: {
		label: 'Trạng thái',
		type: Types.Select,
		options: 'draft, published, archived',
		default: 'published',
		index: true
	},

	author: {
		label: 'Người đăng',
		type: Types.Relationship,
		ref: 'User',
		index: true
	},

	publishedDate: {
		label: 'Ngày đăng',
		type: Types.Date,
		index: true,
		dependsOn: {
			state: 'published'
		}
	},

	activeDate: {
		label:'Ngày kích hoạt',
		type: Types.Datetime,
		index: true,
		hidden: true,
		watch: true,
		value: Date.now
	},

	images :{ 
		label: 'Hình ảnh',
		type: Types.CloudinaryImages, 
		folder: '/upload/images' 
	},

	categories: {
		label: 'Phân loại',
		type: Types.Relationship,
		ref: 'PostCategory',
		many: true
	}
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

/**
 * Relationships
 */

Post.relationship({ ref: 'Bookmark', path: 'bookmarks', refPath: 'post' });

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
