// capheshift 2016
// author: tw

var keystone = require('keystone');
var FB = require('fb');
FB.setAccessToken(process.env.FACEBOOK_TOKEN);

exports = module.exports = function(req, res) {

	FB.api('528623837288211/feed', 'post', { message: 'gọi từ api'}, function (result) {
		if(!result || result.error) {
			console.log(!result ? 'error occurred' : result.error);
			return;
		}
		console.log('post Id: ' + result.id);
		res.json(result);
	});

	// var view = new keystone.View(req, res);
	// var locals = res.locals;
	// locals.user = req.user;

	// // locals.section is used to set the currently selected
	// // item in the header navigation.
	// locals.section = 'home';

	// // Render the view
	// view.render('chi-tiet');
};
