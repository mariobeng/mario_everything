$(function(){
    $("a.chaxun").click(function(){
        $("div.tab").hide();
        $("div.tab_one").show();
        $("a.chaxun img").attr("src","img/icon01_active.png");
        $("a.chaxun p").addClass("active");
        $("a.saoma img").attr("src","img/icon02.png");
        $("a.xinxi img").attr("src","img/icon03.png");
        $("a.saoma p, a.xinxi p").removeClass("active");
    })
    $("a.saoma").click(function(){
        $("div.tab").hide();
        $("div.tab_two").show();
        $("a.saoma img").attr("src","img/icon02_active.png");
        $("a.saoma p").addClass("active");
        $("a.chaxun img").attr("src","img/icon01.png");
        $("a.xinxi img").attr("src","img/icon03.png");
        $("a.chaxun p, a.xinxi p").removeClass("active");
    })
    $("a.xinxi").click(function(){
        $("div.tab").hide();
        $("div.tab_three").show();
        $("a.xinxi img").attr("src","img/icon03_active.png");
        $("a.xinxi p").addClass("active");
        $("a.chaxun img").attr("src","img/icon01.png");
        $("a.saoma img").attr("src","img/icon02.png");
        $("a.chaxun p, a.saoma p").removeClass("active");
    })
})
