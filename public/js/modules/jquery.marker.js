;(function($, window, undefined) {
	var pluginName = 'marker';

	var redIcon = 'http://maps.google.com/mapfiles/ms/icons/red.png';
	var blueIcon = 'http://maps.google.com/mapfiles/ms/icons/blue.png'
	var duration = 500;
	var markersList = [];
	var infoWindowsList = [];
	var lastInfoWindow = null;
	var lastMarker = null;
	var navbarHeight = $('.navbar').height();

	var addClickEventListener = function(map, marker, infoWindow, content, elm) {
		google.maps.event.addListener(marker, 'click', function() {
			if (lastMarker) {
				lastMarker.setIcon(redIcon);
			}

			if (lastInfoWindow) {
				lastInfoWindow.close();
			}

			elm.addClass('active').siblings().removeClass('active');
			$('.index-block--left').animate({
				scrollTop: elm.position().top + navbarHeight
			}, duration);

			marker.setIcon(blueIcon);
			infoWindow.setContent(content);
			infoWindow.open(map, marker);

			lastMarker = marker;
			lastInfoWindow = infoWindow;
		});
	};

	var addMouseEventListener = function(map, marker, infoWindow, content, elm) {
		google.maps.event.addListener(marker, 'mouseover', function() {
			marker.setIcon(blueIcon);

			infoWindow.setContent(content);
			infoWindow.open(map, marker);
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			if (!elm.hasClass('active')) {
				marker.setIcon(redIcon);

				infoWindow.close();
			}
		});
	};

	var contents = function(data) {
		return [
			'<p>',
			data.area, ' m2<br />',
			data.bedroom, ' phỏng ngủ<br />',
			data.bathroom, ' phỏng tắm<br />',
			data.price, ' VNĐ',
			'</p>'
		].join('');
	};

	function Plugin(element, options) {
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.init();
	};

	Plugin.prototype = {
		init: function() {
			var that = this;
			that.vars = {
				map: null,
				mapOptions: {}
			};

			google && google.maps.event.addDomListener(window, 'load', function() {
				var content = '';
				var childrensList = that.element.find(that.options.media);
				var firstChild = childrensList.first();
				
				that.vars.mapOptions = {
					center: new google.maps.LatLng(firstChild.data('latitude'), firstChild.data('longitude')),
					zoom: 16,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				};

				that.vars.map = new google.maps.Map(document.getElementById(that.options.mapId), that.vars.mapOptions);

				childrensList.each(function(ind, val) {
					var self = $(this);
					var data = self.data();
					var wrapper = self.closest(that.options.mediaWrapper);
					
					content = contents(data);
					
					markersList[ind] = new google.maps.Marker({
						position: new google.maps.LatLng(data.latitude, data.longitude),
						map: that.vars.map,
						icon: redIcon
					});

					infoWindowsList[ind] = new google.maps.InfoWindow({
						content: content
					});

					addClickEventListener(that.vars.map, markersList[ind], infoWindowsList[ind], content, wrapper);
					addMouseEventListener(that.vars.map, markersList[ind], infoWindowsList[ind], content, wrapper);
				});
			});

			that.element
				.off('mouseover.view-item', that.options.dataItem)
				.on('mouseover.view-item', that.options.dataItem, function() {
					var parent      = $(this).closest(that.options.mediaWrapper);
					var parentIndex = parent.index();
					var prev        = parent.siblings('.media-wrapper').filter('.active');

					parent.addClass('active');

					if (prev.length) {
						prev.removeClass('active');
						google.maps.event.trigger(markersList[prev.index()], 'mouseout');
					}

					lastMarker = markersList[parentIndex];
					lastInfoWindow = infoWindowsList[parentIndex];

					console.log(lastMarker, lastInfoWindow);
					google.maps.event.trigger(markersList[parentIndex], 'mouseover');
				})
				.off('mouseout.view-item', that.options.dataItem)
				.on('mouseout.view-item', that.options.dataItem, function() {
				});
		},
		destroy: function(){
			this.element.removeData(pluginName);
			delete this;
		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			} else {
				console.log(options ? options + ' method is not exists in ' + pluginName : pluginName + ' plugin has been initialized');
			}
		});
	};

	$.fn[pluginName].defaults = {
		mapId: 'google-map',
		mediaWrapper: '.media-wrapper',
		media: '.media',
		dataItem: '[data-item]'
	};

	$(function() {
		$('[data-' + pluginName + ']')[pluginName]();
	});
}(jQuery, window));
