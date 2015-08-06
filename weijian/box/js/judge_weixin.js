//判断是否为微信浏览器
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }
}
$(function(){
    $("a.weixin").click(function(){
        if(!isWeiXin()){
            location.href = "weixin.html";
        }else{
            location.href = "saoma.html";
        }
    })
})
