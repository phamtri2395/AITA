// @capheshift 2015
// Author: Mountain

var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var Config = require('./config');
var Utilities = require('./utilities');

//Authentication user
exports.isAuthentication = function(req, res, next) {
	if ((req.user._id === req.userData._id.toString()) || req.user.role === 1) {
		return next();
	} else {
		return res.status(401).jsonp();
	}
};
