// capheshift 2015
// author: Tw

/* globals google, FB */
var center = new google.maps.LatLng(10.81416666666667, 106.66694444444444);

function initialize() {
	var mapProperties = {};
	var map = null;
	var marker = {};
	var infowindow = {};
	var destinations = [
		{
			id: 1,
			lat: 10.81416666666667,
			lon: 106.66694444444444,
			title: 'Title 1',
			description: 'Description 1'
		},
		{
			id: 2,
			lat: 10.81516666666667,
			lon: 106.66994444444444,
			title: 'Title 2',
			description: 'Description 2'
		},
		{
			id: 3,
			lat: '',
			lon: '',
			title: 'Title 3',
			description: 'Description 3'
		},
		{
			id: 4,
			lat: '',
			lon: '',
			title: 'Title 4',
			description: 'Description 4'
		},
		{
			id: 5,
			lat: '',
			lon: '',
			title: 'Title 5',
			description: 'Description 5'
		},
		{
			id: 6,
			lat: '',
			lon: '',
			title: 'Title 6',
			description: 'Description 6'
		},
		{
			id: 7,
			lat: '',
			lon: '',
			title: 'Title 7',
			description: 'Description 7'
		},
		{
			id: 8,
			lat: '',
			lon: '',
			title: 'Title 8',
			description: 'Description 8'
		}
	];

	mapProperties = {
		center: center,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById('google-map'), mapProperties);

	marker[1] = new google.maps.Marker({position: center});
	marker[1].setMap(map);


	infowindow[1] = new google.maps.InfoWindow({
		content: 'I was here!'
	});
	infowindow[1].open(map, marker[1]);

	google.maps.event.addListener(marker[1], 'click', function() {
		map.setZoom(18);
		map.setCenter(marker[1].getPosition());
	});


	marker[2] = new google.maps.Marker({position: new google.maps.LatLng(10.81516666666667, 106.66994444444444)});
	marker[2].setMap(map);


	infowindow[2] = new google.maps.InfoWindow({
		content: 'I was here!'
	});
	infowindow[2].open(map, marker[2]);

	google.maps.event.addListener(marker[2], 'click', function() {
		map.setZoom(18);
		map.setCenter(marker[2].getPosition());
	});

}

google.maps.event.addDomListener(window, 'load', initialize);


// facebook functions
var fbSend = function() {
	FB.ui({
		method: 'send',
		to: '100005774646691',
		link: 'http://www.visla.vn/du-an/468/sunrise-city?aid=20686',
		redirect_uri: 'https://www.google.com/?gws_rd=ssl'
	});
};

$(document).ready(function() {
	var fancyboxElm = $('.fancybox');
	var itemsList = $('[data-items-list]');

	if (fancyboxElm.length) {
		fancyboxElm.fancybox();
	}

	if (itemsList.length) {
		itemsList.hover(function() {
			console.log('over');
		}, function() {
			console.log('out');
		});
	}
});
