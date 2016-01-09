// capheshift 2016
// author: tw

// var keystone = require('keystone');
var FB = require('fb');
FB.setAccessToken(process.env.FACEBOOK_TOKEN);

exports = module.exports = function(req, res) {
	//ref from https://developers.facebook.com/docs/graph-api/reference/post#publishing
	var message = {
		message: 'Chúng tôi cần Bán và cho Thuê căn hộ cao cấp Sun Rise City tại quận 7, nằm tại trục đường Nguyễn Hữu Thọ liên kết với các quận 1, 4, 5, 8. \nMặt tiền đường Nguyễn Hữu Thọ, đối diện siêu thị Lotte Quận 7.',

		// name of the link
		name: 'Aita.vn',
		link: 'http://aitavn.herokuapp.com/chi-tiet/',
		picture: 'http://file4.batdongsan.com.vn/resize/745x510/2015/06/04/20150604150037-9e21.jpg',
		description: 'Nếu biết tình như thế, chẳng lớn lên làm gì',
		caption: 'aita.vn',

		// place: 'Sai gon',
		story: 'Chuyện tình dưới mưa, tần khánh',
		type: 'photo'
	};

	FB.api('528623837288211/feed', 'post', message, function (result) {
		if(result.error) {
			res.json({err: result.error});	
		} else {
			res.json(result);
		}
	});
};
