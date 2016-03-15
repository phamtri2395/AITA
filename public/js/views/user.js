// @aita 2016
// @author: skullopus

$(document).on('ready', function() {
	$('.form-reactivate > a').click(function() {
		$(this).parent().submit();
	});
});

$(document).on('submit','.form-reactivate',function(e){
	e.preventDefault();
  
  var postId = $(this).attr("value");

	$.ajax({
	type: "POST",
	url: "/user/reactivate/" + postId,
	});

});
