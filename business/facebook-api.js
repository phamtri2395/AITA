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
	},

	publishAlbums: function(albumsContext, imageList, callback) {
		var facebookPageId = process.env.FACEBOOK_PAGE_ID;

		FB.api(facebookPageId + '/albums', 'post', albumsContext, function (albumData) {
			if (!albumData || albumData.error) {
				if (callback) {
					callback(!albumData ? 'error occurred' : albumData.error);
					return;
				}
			}

			console.log(albumData);
			var albumId = albumData.id;
			callback(albumData);

			imageList.forEach(function(item) {
				FB.api(albumId + '/photos', 'post', {url: item.url}, function(imageData) {
					if (!imageData || imageData.error) {
						callback(!imageData ? 'error occurred' : imageData.error);
						return;
					}

					if (callback) {
						console.log(imageData);
					}
				});
			});
		});
	}
};
