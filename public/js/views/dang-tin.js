// capheshift 2016
// author: tw
/*global $, google */

/**
 * reference from here
 * https://developers.google.com/maps/documentation/javascript/events
 */

$(document).on('ready', function() {
	var map, mapOptions, center, currentMarker;
	center = new google.maps.LatLng(10.81416666666667, 106.66694444444444);
	mapOptions = {
		center: center,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var getLocation = function() {
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
		} else {
				console.log('Geolocation is not supported by this browser.');
		}
	};

	var showPosition = function(pos) {
		var coords = pos.coords;
		var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

		updateToInput(latLng);
		setCurrentMarker(latLng);
		map.setCenter(latLng);
	};

	var setCurrentMarker = function(latLng) {
		if (currentMarker) {
			currentMarker.setMap(null);
		}
		currentMarker = new google.maps.Marker({
			position: latLng,
			map: map,
			icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
		});
	};

	var updateToInput = function(latLng) {
		var $inputLat = $('[name="google-lat"]');
		var $inputLng = $('[name="google-lng"]');

		$inputLat.val(latLng.lat());
		$inputLng.val(latLng.lng());
	};

	var initDangTin = function() {
		console.log('Dang Tin >>');
		getLocation();

		map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		map.addListener('click', function(e) {
			setCurrentMarker(e.latLng);
			updateToInput(e.latLng);
		});
	};

	// only apply for dang-tin page
	if ($('.container').hasClass('jspage-dang-tin')) {
		initDangTin();
	}
});
