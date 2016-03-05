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
	
	FB.ui({
		'method': 'send',
		'to': facebookId,
		'link': 'http://www.visla.vn/du-an/468/sunrise-city?aid=20686',
		'redirect_uri': 'https://www.google.com/?gws_rd=ssl'
	});
};

// var center = new google.maps.LatLng(10.81416666666667, 106.66694444444444);

// var addClickEventListener = function(map, marker, infoWindow, content) {
// 	google.maps.event.addListener(marker, 'click', function() {
// 		infoWindow.setContent(content);
// 		infoWindow.open(map, marker);
// 	});
// };

// var addMouseEventListener = function(map, marker, infoWindow, content) {
// 	google.maps.event.addListener(marker, 'mouseover', function() {
// 		marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue.png');
		
// 		infoWindow.setContent(content);
// 		infoWindow.open(map, marker);
// 	});

// 	google.maps.event.addListener(marker, 'mouseout', function() {
// 		marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red.png');

// 		infoWindow.close();
// 	});
// };

// var marker = [];
// function initialize() {
// 	var mapOptions = {};
// 	var map = null;
// 	var infoWindow = [];
// 	var i = 0;
// 	var len = 0;
// 	var destinations = [
// 		{
// 			id: 1,
// 			lat: 10.81416666666667,
// 			lon: 106.66794444444444,
// 			title: 'Title 1',
// 			description: 'Description 1<br />Description 1.1'
// 		},
// 		{
// 			id: 2,
// 			lat: 10.81516666666667,
// 			lon: 106.66894444444444,
// 			title: 'Title 2',
// 			description: 'Description 2'
// 		},
// 		{
// 			id: 3,
// 			lat: 10.81316666666667,
// 			lon: 106.66594444444444,
// 			title: 'Title 3',
// 			description: 'Description 3'
// 		},
// 		{
// 			id: 4,
// 			lat: 10.81216666666667,
// 			lon: 106.66494444444444,
// 			title: 'Title 4',
// 			description: 'Description 4'
// 		},
// 		{
// 			id: 5,
// 			lat: 10.81716666666667,
// 			lon: 106.66394444444444,
// 			title: 'Title 5',
// 			description: 'Description 5'
// 		},
// 		{
// 			id: 6,
// 			lat: 10.81816666666667,
// 			lon: 106.66294444444444,
// 			title: 'Title 6',
// 			description: 'Description 6'
// 		},
// 		{
// 			id: 7,
// 			lat: 10.81116666666667,
// 			lon: 106.66194444444444,
// 			title: 'Title 7',
// 			description: 'Description 7'
// 		},
// 		{
// 			id: 8,
// 			lat: 10.81016666666667,
// 			lon: 106.66094444444444,
// 			title: 'Title 8',
// 			description: 'Description 8'
// 		}
// 	];

// 	mapOptions = {
// 		center: center,
// 		zoom: 16,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP
// 	};

// 	map = new google.maps.Map(document.getElementById('google-map'), mapOptions);

// 	for (i = 0, len = destinations.length; i < len; i++) {
// 		marker[i] = new google.maps.Marker({
// 			position: new google.maps.LatLng(destinations[i].lat, destinations[i].lon),
// 			title: destinations[i].title,
// 			map: map,
// 			icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
// 		});

// 		infoWindow[i] = new google.maps.InfoWindow({
// 			content: ''
// 		});

// 		addClickEventListener(map, marker[i], infoWindow[i], destinations[i].description);
// 		addMouseEventListener(map, marker[i], infoWindow[i], destinations[i].description);
// 	}
// }


// // dont apply this function on dang-tin page
// if (!$('.container').hasClass('jspage-dang-tin')) {
// 	google.maps.event.addDomListener(window, 'load', initialize);
// }

// $(document).ready(function() {
// 	var fancyboxElm = $('.fancybox');

// 	if (fancyboxElm.length) {
// 		fancyboxElm.fancybox();
// 	}

// 	$('.list-result')
// 		.off('mouseover.view-item', '[data-items-list]').on('mouseover.view-item', '[data-items-list]', function() {
// 			var self = $(this);
// 			google.maps.event.trigger(marker[self.closest('.media').index()], 'mouseover');
// 		})
// 		.off('mouseout.view-item', '[data-items-list]').on('mouseout.view-item', '[data-items-list]', function() {
// 			var self = $(this);
// 			google.maps.event.trigger(marker[self.closest('.media').index()], 'mouseout');
// 		});
// });
