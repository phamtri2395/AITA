// capheshift 2016
// author: tw

/*global $, Dropzone */
/**
 * reference from here
 * https://developers.google.com/maps/documentation/javascript/events
 */

$(document).on('ready', function() {

	// only apply for dang-tin page
	if ($('.container').hasClass('jspage-dang-tin')) {

		var $dropzone = $('#my-awesome-dropzone');
		var dropzone = new Dropzone('#my-awesome-dropzone');

		dropzone.on('success', function(e, res) {
			$dropzone.trigger('dropzone-success', res.file);
		});
		
		// dropzone.on('removedFile', function(e, res) {});
	}
});
