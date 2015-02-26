$(function(){
	$("div.th_li").each(function(index){
		
		$(this).mouseover(function(){
			$(this).css("background-color","#1DAE46");
			$(this).children("h3").css("color","#fff");
			$(this).children("p").children("b").css("color","#fff");
			$(this).children("p").children("span.priceno").css("color","#DAD1AF");
			$(this).children("p").children("span.heart-e").css("background","url(images/heart.png) no-repeat 0 0");
		})
		$(this).mouseout(function(){
			$(this).css("background-color","#EBE6DC");
			$(this).children("h3").css("color","#070a08");
			$(this).children("p").children("b").css("color","#5a4f21");
			$(this).children("p").children("span.priceno").css("color","#aaa48a");
			$(this).children("p").children("span.heart-e").css("background","url(images/heart.png) no-repeat 0 bottom");
		})
	})
	
	$("span.heart-e").each(function(index){
		$(this).click(function(){
			$(this).css("background","url(images/heart.png) no-repeat 0 center");
			$(this).removeClass("heart-e").addClass("heart-red");
		})
	})
	
})