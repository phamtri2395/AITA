/**
 * Capheshift 2016
 * Author: Tw
 */

/*global $*/

$(document).on('ready', function() {

	var $navtabItems = $('.nav-tabs--item');
	$navtabItems.on('click', function() {
		var $this = $(this);
		var $parent = $this.closest('.nav-tabs');
		var $tabContent = $($this.attr('data-href'));
		var $tabContentParent = $tabContent.closest('.tab-content');

		// add/remove class at nav-tabs
		$parent.find('.nav-tabs--item').removeClass('active');
		$this.addClass('active');
		
		// add/remove class at tab-content
		$tabContentParent.find('.tab-content--pane').removeClass('active');
		$tabContent.addClass('active');
	});
});
