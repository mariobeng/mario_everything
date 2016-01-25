$(function(){
    $("a.dingwei").click(function(){
        $("div.success, div.city").show();
        $("div.city ul li").addClass("city_dh");
    })
    $("a.ankang").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #FF623A",
            "box-shadow":"0 0 3px 2px #FF623A"
        })
    })
    $("a.shangluo").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #FF3C45",
            "box-shadow":"0 0 3px 2px #FF3C45"
        })
    })
    $("a.baoji").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #FAAB30",
            "box-shadow":"0 0 3px 2px #FAAB30"
        })
    })
    $("a.weinan").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #5EC758",
            "box-shadow":"0 0 3px 2px #5EC758"
        })
    })
    $("a.tongchuan").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #49ADDC",
            "box-shadow":"0 0 3px 2px #49ADDC"
        })
    })
    $("a.xianyang").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #5875BE",
            "box-shadow":"0 0 3px 2px #5875BE"
        })
    })
    $("a.xian").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #69A354",
            "box-shadow":"0 0 3px 2px #69A354"
        })
    })
    $("a.yulin").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #ADCE46",
            "box-shadow":"0 0 3px 2px #ADCE46"
        })
    })
    $("a.hanzhong").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #27A9A8",
            "box-shadow":"0 0 3px 2px #27A9A8"
        })
    })
    $("a.yanan").click(function(){
        $(this).css({
            "-webkit-box-shadow":"0 0 3px 2px #495EB9",
            "box-shadow":"0 0 3px 2px #495EB9"
        })
    })
})
