// @aita 2016
// @author: skullopus

$(document).on('ready', function() {
	$('.btn-bookmark').click(function() {

		$('.form-bookmark', this).submit();

		if ($(this).hasClass('bookmarked')) {
			$(this).removeClass('bookmarked');
		}
		else {
			$(this).addClass('bookmarked');
		}

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

$(document).on('submit','.form-bookmark',function(e){
	e.preventDefault();
  
  var postId = $(this).attr("value");
	$.ajax({
	type: "POST",
	url: "/user/bookmark/" + postId,
	});

});
