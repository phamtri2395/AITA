// capheshift 2016
// author: tw

var FB = require('fb');
FB.setAccessToken(process.env.FACEBOOK_TOKEN);

exports = module.exports = {
	post: function(message, callback) {
		FB.api('528623837288211/feed', 'post', message, function (res) {
			if(!res || res.error) {
				if (callback) {
					callback(!res ? 'error occurred' : res.error);
					return;
				}
			}

			// all successed
			if (callback) {
				callback(null, res);
			}
		});
	}
};
