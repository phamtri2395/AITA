// @capheshift 2015
// Author: tw

var _ = require('lodash');
var keystone = require('keystone');
var restful = require('../../cores/restful');
var utils = require('../../cores/utilities');
var PostModel = keystone.list('Post').model;
var ImageModel = keystone.list('ImageModel').model;

exports = module.exports = _.assign(restful(PostModel), {
	getOwnPost: function(req, res) {
		if (!req.user) {
			res.jsonp(utils.response(false, null, { err: 'no permision' }));
			return;
		}

		PostModel.find({ author: req.user._id }).exec().then(function(data) {
			res.jsonp(utils.response(true, data));
		},
		function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	},

	add: function(req, res) {
		console.log('req body', req.body);
		PostModel.create(req.body).then(function(data) {
			console.log('Add new post successful');

			// if (uploadFiles.length) {
			// 	_.forEach(uploadFiles, function(file) {
			// 		ImageModel.create(_.assign(file, {postId: data._id})).then(function(data) {
			// 			console.log('Save images successFull');
			// 		}, function(err) {
			// 			console.log('ImageModel uploadFiles error', err);
			// 		});
			// 	});
			// }

			// // facebook message content
			// var message = {
			// 	message: data.description,

			// 	// name of the link
			// 	link: process.env.HOST_URL + '/chi-tiet/' + data._id,
			// 	picture: 'http://file4.batdongsan.com.vn/resize/745x510/2015/06/04/20150604150037-9e21.jpg',
			// 	image: 'http://file4.batdongsan.com.vn/resize/745x510/2015/06/04/20150604150037-9e21.jpg',
			// 	name: 'Bán nhà 100m2, 2 phòng ngủ, 2 phòng tắm, 2.5tỉ',
			// 	description: 'Trang chuyên bất động sản TP.HCM',
			// 	caption: 'Aita.vn',

			// 	// place: 'Sai gon',
			// 	story: 'Aita.vn 3',
			// 	type: 'photo'
			// };

			// // post content to fanpage
			// facebookApi.post(message, function(err, res) {
			// 	if (!err) {
			// 		console.log('facebookApi', res);
			// 	} else {
			// 		console.log('facebookApi err', err);
			// 	}
			// });
			// 
			
			res.jsonp(utils.response(true, data));
		}, function(err) {
			res.jsonp(utils.response(false, null, err));
		});
	}
});
