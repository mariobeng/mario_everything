$(function(){
    $("input.self, input.new_p").focus(function(){
        $("input.get_yzm").removeAttr("disabled");
        $("input.get_yzm").css("background-color","#FED201");
    })
})
