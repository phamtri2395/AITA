var center = new google.maps.LatLng(10.81416666666667, 106.66694444444444);

function initialize() {
	var mapProperties = {};
	var map = null;
	var marker = {};
	var infowindow = {};

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
