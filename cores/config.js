// @capheshift 2015
// Author: Mountain

'use strict';

module.exports = {
	'Env': {
		'development': {
			'Database': 'mongodb://127.0.0.1/Daily-Scrum'
		},
		'production': {
			'Database': 'mongodb://heroku_1p1d0r7k:g2ov8l3sdia48o6ho2vlt8mufa@ds041623.mongolab.com:41623/heroku_1p1d0r7k'
		}
	},

	'JWTSecret': 'Capheshift',
	
	'Populate': {
		'User': 'username',
		'UserFull': '-salt -hashed_password'
	},

	'User': {
		'Types': {
			'Local': 1,
			'Facebook': 2,
			'Google': 3
		},

		'Role': {
			'Admin': 1,
			'User': 2
		},
		'Status': {
			'Active': 1,
			'Inactive': 2
		}
	}
};
