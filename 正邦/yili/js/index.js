$(function(){

    $("button.my_btn").click(function(){
        if($("input.tel").val() == ""){
            $("div.success, div.gongxi").show();

        }else{
            $("div.success, div.no_again").show();
        }
    });
    $("a.sure").click(function(){
        $("div.success, div.gongxi").hide();
    });
    $("a.close").click(function(){
        $("div.success, div.no_again").hide();
    });

    $("input.tel").focus(function(){
        $("input.get_yzm").removeAttr("disabled");
        $("input.get_yzm").css("background-color","#FED201");
    })
});
