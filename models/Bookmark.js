// @aita 2016
// @author: skullopus

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Bookmark Model
 * ==================
 */

var Bookmark = new keystone.List('Bookmark');

Bookmark.schema.index({ user: 1, post: 1 }, { unique: true });

Bookmark.add({
	user: {
		type: Types.Relationship,
		ref: 'User'
	},

	post: {
		type: Types.Relationship,
		ref: 'Post'
	}
});

Bookmark.register();
