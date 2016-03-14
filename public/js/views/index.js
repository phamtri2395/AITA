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
});

$(document).on('submit','.form-bookmark',function(e){
	e.preventDefault();
  
  var postId = $(this).attr("value");
	$.ajax({
	type: "POST",
	url: "/user/bookmark/" + postId,
	});

});
