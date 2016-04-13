// @aita 2016
// @author: tw

var keystone = require('keystone');
var Types = keystone.Field.Types;
var ImageModel = keystone.list('ImageModel');

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

	state: {
		label: 'Trạng thái',
		type: Types.Select,
		options: [
			{ value: 'draft', label: 'Bản nháp' },
			{ value: 'published', label: 'Đăng bài' },
			{ value: 'archived', label: 'Lưu trữ' },
		],
		default: 'published',
		index: true
	},

	type: {
		label: 'Cho Thuê / Bán',
		type: Types.Select,
		options: [
			{ value: 'thue', label: 'Cho thuê' },
			{ value: 'ban', label: 'Bán' },
		],
		default: 'thue',
	},

	realEstate: {
		label: 'Loại',
		type: Types.Select,
		options: [
			{ value: 'nha', label: 'Nhà' },
			{ value: 'can-ho', label: 'Căn hộ' },
			{ value: 'phong', label: 'Phòng' },
		],
		default: 'phong',
	}, 

	district: {
		label: 'Quận',
		type: Types.Relationship,
		ref: 'District',
		default: true
	},

	// ward: {
	// 	label: 'Phường',
	// 	type: Types.Relationship,
	// 	ref: 'Ward',
	// 	default: true
	// },

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

	projectName: {
		label: 'Tên dự án',
		type: String,
		required: false
	},

	projectLink: {
		label: 'Link mô tả dự án',
		type: Types.Url,
		required: false
	},

	direct: {
		label: 'Hướng',
		type: String,
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

	pushAds: {
		label: 'Chạy quảng cáo',
		type: Boolean,
		default: false
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
		default: Date.now
	},

	isExpired: {
		type: Boolean,
		watch: 'activeDate',
		value: isExpired,
		noedit: true
	},

	categories: {
		label: 'Phân loại',
		type: Types.Relationship,
		ref: 'PostCategory',
		many: true
	}
});

// minusDay function
var minusDays = function(date, days) {
	var result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};
// Check if post is expired
function isExpired() {
	var EXPIRE_PERIOD = 13;

	if (!((this.activeDate >= minusDays(Date.now(), EXPIRE_PERIOD)) && (this.activeDate <= Date.now()))) {
		return true;
	}

	console.log('isExpired: FALSE');
	return false;
}

Post.schema.add({
	images: {
		label: 'Hình ảnh',
		type: [{
			fieldname: { type: String},
			originalname: { type: String},
			name: { type: String},
			encoding: { type: String},
			mimetype: { type: String},
			path: { type: String},
			extension: { type: String},
			size: { type: Number},
			truncated: { type: Boolean},
			serverPath: { type: String},
		}]
	}
});

Post.schema.virtual('virtualProp').get(function() {
	return true;
	// return this.content.extended || this.content.brief;
});

Post.schema.statics = {
	getPopulateFields: function() {
		return 'author';
	}
};

/**
 * Relationships
 */

Post.relationship({ ref: 'Bookmark', path: 'bookmarks', refPath: 'post' });

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
