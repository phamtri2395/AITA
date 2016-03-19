;(function($, window, undefined) {
	var pluginName = 'marker';

	var redIcon = 'http://maps.google.com/mapfiles/ms/icons/red.png';
	var blueIcon = 'http://maps.google.com/mapfiles/ms/icons/blue.png'

	var addClickEventListener = function(map, marker, infoWindow, content) {
		google.maps.event.addListener(marker, 'click', function() {
			infoWindow.setContent(content);
			infoWindow.open(map, marker);
		});
	};

	var addMouseEventListener = function(map, marker, infoWindow, content) {
		google.maps.event.addListener(marker, 'mouseover', function() {
			marker.setIcon(blueIcon);

			infoWindow.setContent(content);
			infoWindow.open(map, marker);
		});

		google.maps.event.addListener(marker, 'mouseout', function() {
			marker.setIcon(redIcon);

			infoWindow.close();
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
				markersList: [],
				infoWindowsList: [],
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
					
					content = contents(data);
					
					that.vars.markersList[ind] = new google.maps.Marker({
						position: new google.maps.LatLng(data.latitude, data.longitude),
						map: that.vars.map,
						icon: redIcon
					});

					that.vars.infoWindowsList[ind] = new google.maps.InfoWindow({
						content: content
					});

					addClickEventListener(that.vars.map, that.vars.markersList[ind], that.vars.infoWindowsList[ind], content);
					addMouseEventListener(that.vars.map, that.vars.markersList[ind], that.vars.infoWindowsList[ind], content);
				});
			});

			that.element
				.off('mouseover.view-item', that.options.dataItem)
				.on('mouseover.view-item', that.options.dataItem, function() {
					var parent = $(this).closest(that.options.mediaWrapper);
					parent.addClass('active');
					google.maps.event.trigger(that.vars.markersList[parent.index()], 'mouseover');
				})
				.off('mouseout.view-item', that.options.dataItem)
				.on('mouseout.view-item', that.options.dataItem, function() {
					var parent = $(this).closest(that.options.mediaWrapper);
					parent.removeClass('active');
					google.maps.event.trigger(that.vars.markersList[parent.index()], 'mouseout');
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
