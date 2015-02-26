$(function(){
	/*控制声音*/
	$(".music").on("click",function(){
	    var audioEle=document.querySelector("audio");
	    if(audioEle.paused){
	        $(".music").removeClass("music_off");
	        audioEle.play();
	    }else{
	        $(".music").addClass("music_off");
	        audioEle.pause();
	    }
	});
	/*动画库*/
	$(".old_t").addClass('animated fadeInDownBig');
	$(".old_a").addClass('animated fadeInRight');
	$(".old_b").addClass('animated fadeInLeft');
	$(".old_c").addClass('animated fadeInRight');
	$(".old_d").addClass('animated fadeInLeft');
	$(".six_t").addClass('animated rollIn');
	$(".six_a").addClass('animated bounceIn');
	$(".six_b").addClass('animated bounceIn');
	$(".six_c").addClass('animated fadeInRight');
	
	$(".seven_t").addClass('animated rotateIn');
	$(".seven_a").addClass('animated bounceIn');
	$(".seven_b").addClass('animated fadeInRight');
	
	$(".eight_t").addClass('animated flip');
	$(".eight_a").addClass('animated fadeInDownBig');
	$(".eight_b").addClass('animated fadeInRight');
	$(".eight_c").addClass('animated fadeInRight');
	
	$(".nine_t").addClass('animated rotateInUpRight');
	
	$(".ten_t").addClass('animated slideInDown');
	$(".ten_a").addClass('animated fadeInLeft');
	$(".ten_b").addClass('animated fadeInUp');
	
	$(".eleven_t").addClass('animated tada');
	$(".eleven_a").addClass('animated fadeInLeft');
	$(".eleven_b").addClass('animated fadeInRight');
	$(".eleven_c").addClass('animated fadeInUp');
	
	$(".twelve_t").addClass('animated fadeInRightBig');
	
	$(".one_t").addClass('animated fadeInLeftBig');
	$(".wenzi").addClass('animated rotateInDownLeft');
	$(".two_t").addClass('animated rotateIn');
	$(".bike_t").addClass('animated flipInY');
})












