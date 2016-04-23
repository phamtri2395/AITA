// @aita 2016
// @author: skullopus

$(document).on('ready', function() {
	$('.bookmark').click(function() {
		// Handle animation
		if ($(this).hasClass('btn-bookmark')) {
			$(this).removeClass('btn-bookmark').addClass('btn-bookmarked');
		}
		else {
			$(this).removeClass('btn-bookmarked').addClass('btn-bookmark');
		}

		// Send ajax
	  var _id = $(this).attr("value");
		$.ajax({
		type: "PUT",
		url: "/api/post/bookmark/" + _id,
		});
	});

	$('.result-block').off('click.gallery', '.fancybox-thumb').on('click.gallery', '.fancybox-thumb', function(e) {
		e.preventDefault();
		$.fancybox.open($(this).closest('.gallery').find('.fancybox-thumb'), {
			helpers: {
				prevEffect: 'none',
				nextEffect: 'none',
				title: {
					type: 'outside'
				},
				thumbs: {
					width: 50,
					height: 50
				}
			}
		});
	});
});
