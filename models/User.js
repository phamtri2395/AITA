var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User');

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: false },
	gender: { type: Boolean, required: false },
	providerId: { type: String, required: false, index: true },
	provider: { type: String, required: false },
	avatar: { type: Types.Url, required: false },
	phone: { type: String, required: false }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });
User.relationship({ ref: 'Bookmark', path: 'bookmarks', refPath: 'user' });



/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
