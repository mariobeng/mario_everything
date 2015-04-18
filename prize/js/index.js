$(function(){
	var b_width = $(window).width();
	var a_width = $("a.pri_btn").width();
	var a_left = (b_width - a_width)/2;
	$("a.pri_btn").css({
		"left" : a_left,
		"height" : a_width,
	});
})