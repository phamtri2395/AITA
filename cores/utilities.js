// @capheshift 2015
// Author: Mountain

// var Config = require('./config');
// var fs = require('fs');
// var chars = '0123456789';
var checkForHexRegExp = new RegExp('^[0-9a-fA-F]{24}$');

exports.validateObjectId = function(id, callback) {
	return callback(checkForHexRegExp.test(id));
};

exports.response = function(success, data, message, statusCode) {
	var status = success ? '1' : '0';
	return {
		'success': success,
		'status': status,
		'statusCode': statusCode ? statusCode : 200,
		'message': message ? message : 'successfully',
		'data': data ? data : {}
	};
};

// exports.getErrorMessage = function(req, err) {
// 	console.log('error ' + err);
// 	var errText = '';
// 	if (!err) {
// 		errText = 'Server error';
// 	} else if (err.errors) {
// 		errText = err.errors[Object.keys(err.errors)[0]] ? err.errors[Object.keys(err.errors)[0]].message : 'Server error';
// 	} else {
// 		errText = err.message;
// 	}
// 	return errText;
// };
