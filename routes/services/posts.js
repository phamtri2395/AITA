/**
 * Aita 2016
 * Author: 
 */

var _ = require('lodash');
var keystone = require('keystone');
var facebookApi = require('../../business/facebook-api');
var PostModel = keystone.list('Post').model;

exports = module.exports = _.assign(PostModel, {
	add: function(req, res) {
		console.log('add-body', req.body);
		PostModel.create(req.body).then(function(data) {
			console.log('success', data);
			res.redirect('/');
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
		}, function(err) {
			console.log('error', err);
		});
	}
});
