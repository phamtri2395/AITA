// capheshift 2016
// author: tw

// var keystone = require('keystone');
var FB = require('fb');
FB.setAccessToken(process.env.FACEBOOK_TOKEN);

var facebookService = require('../../business/facebook-api');

exports = module.exports = function(req, res) {	
	var albumsContext, imageList;

	albumsContext = {
		name: 'Publish by Api',
		location: 'Bình Thạnh',
		message: '40 m2 | 5 phòng ngủ | 8 phòng tắm | 7000,000VND/tháng \n #aitabinhthanh #hosttel \n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	};

	imageList = [
		{ url: 'http://3.bp.blogspot.com/-IO3PTvRqs_g/Vfi_LLR3H5I/AAAAAAAAAGY/oY842Xnq_bg/s1600/OnePiece.png' },
		{ url: 'https://upload.wikimedia.org/wikipedia/en/6/62/Main_characters_of_One_Piece.png' },
		{ url: 'http://vignette4.wikia.nocookie.net/onepiece/images/c/c7/One_Piece_The_Movie.png/revision/latest?cb=20130116155817' },
		{ url: 'https://s-media-cache-ak0.pinimg.com/736x/f1/7b/d7/f17bd71c0d17d4dbfdd8af0e0f8c23de.jpg' },
		{ url: 'http://www.playonepiece.me/uploads/article/images/one_piece_luffy_by_cheing.jpg' },
	];

	facebookService.publishAlbums(albumsContext, imageList, function(data) {
		res.json(data);
	});
};
