/*$(function(){
    var load_w = $("div.load").width();
    var load_h = $("div.load").height();

    var img_w = $("div.load img").width();
    var img_h = $("div.load img").height();

    var img_l = (load_w - img_w)/2;
    var img_t = (load_h - img_h)/2;

    $("div.load img").css({
        "left":img_l,
        "top":img_t
    });
})*/
window.onload = function(){
    $("div.load").fadeOut();
}
