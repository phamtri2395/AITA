/**
 * capheshift 2015
 * author: tw
 */

/* globals google, FB, $ */

/**
 * facebook functions
 */
var fbSend = function(e) {
	var $element = $(e);
	var facebookId = $element.attr('data-facebook-id');
	var link = $element.attr('data-link');
	
	FB.ui({
		'method': 'send',
		'to': facebookId,
		'link': link,
		'redirect_uri': 'https://www.google.com/?gws_rd=ssl'
	});
};

$(function() {
	$('.js-menu-button').on('click', function() {
		var $checkbox = $('.js-menu-kepper');
		$checkbox.prop('checked', !$checkbox.prop('checked'));
	});

	$('.js-search-button').on('click', function() {
		var $searchbox = $('.js-search-box-container');
		$searchbox.toggle();
		$('.index-block--left').animate({ scrollTop: 0 }, 100);
	});
});
