// capheshift 2016
// author: tw

var FB = require('fb');
FB.setAccessToken(process.env.FACEBOOK_TOKEN);

exports = module.exports = {
	post: function() {
		FB.api('528623837288211/feed', 'post', { message: 'gọi từ api'}, function (res) {
			if(!res || res.error) {
				console.log(!res ? 'error occurred' : res.error);
				return;
			}
			console.log('post Id: ' + res.id);
		});
	}
};
