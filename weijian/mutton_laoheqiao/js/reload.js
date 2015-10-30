/*$(function(){
    var load_w = $("div.load").width();
    var load_h = $("div.load").height();

    var img_w = $("div.load span").width();
    var img_h = $("div.load span").height();

    var img_l = (load_w - img_w)/2;
    var img_t = (load_h - img_h)/2;

    $("div.load span").css({
        "left":img_l,
        "top":img_t
    });
})*/
window.onload = function(){
    $("div.load").fadeOut();
}
