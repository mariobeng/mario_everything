(function() {

    var MAP_BOTTOM_OVERLAP_RATE = 0.4;
    // var MAP_BOTTOM_OVERLAP_RATE = 0;
    //获取url地址id参数
function getUrlParam(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
}

function initHeights() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var headHeight = $('#head_box').height();
    var bottomImgHeight = $('#bot-img').height();
    var imgOverlapHeight = bottomImgHeight * MAP_BOTTOM_OVERLAP_RATE;
    var bottomHeight = bottomImgHeight - imgOverlapHeight;
    var contentHeight = windowHeight - headHeight - bottomHeight;
    $('#content').css('height', contentHeight);
    $('#bot').css('height', bottomHeight);

}


function indexInitHeights() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    // var headHeight = $('#head_box').height();
    // var bottomImgHeight = $('#bot-img').height();
    var headHeight = 92 / 639 * windowWidth;
    var bottomImgHeight = 269 / 639 * windowWidth;
    var imgOverlapHeight = bottomImgHeight * MAP_BOTTOM_OVERLAP_RATE;
    var bottomHeight = bottomImgHeight - imgOverlapHeight;
    var contentHeight = windowHeight - headHeight - bottomHeight;
    $('#content').css('height', contentHeight);
    $('#bot').css('height', bottomHeight);

}
function liveLayerInitHeights() {
    var windowHeight = $(window).height();
    var videoLayerWidth = $(window).width()*0.85;
    var contentWidth = $(window).width()*0.85;

    var bottomHeight = videoLayerWidth * 149 / 532;
    var contentHeight = windowHeight - bottomHeight;

    $('#video_layer').width($(window).width());
    $('#video_layer_content').width(contentWidth);
    $('#video_content').height(contentHeight);
    $('#bottom-live-img').width(contentWidth);

    // $('#video_layer_content').css({'width': contentWidth, 'height': contentHeight});
    // $('#video_layer_content').css('width', videoLayerWidth);
    // $('#video_bottom_box').css('width', videoLayerWidth);
    // $('#video_content').css({'width': videoLayerWidth, 'height': contentHeight});
    // $('#bottom-live-img').css({'width': videoLayerWidth});
}

function liveInitHeights() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();


    var headHeight = $('#head_box').height();
    var bottomImgHeight = $('#bot-live-img').height();
    var bottomHeight = bottomImgHeight;
    var contentHeight = windowHeight - headHeight - bottomHeight;
    $('#content').css('height', contentHeight);
    $('#bot-live').css('height', bottomHeight);

}
function clickHeights() {
    var headHeight = $('#head_box').height();
    var bottomImgHeight = $('#bot-img').height();
    var imgOverlapHeight = Math.ceil(bottomImgHeight * 0.4);
    var bottomHeight = bottomImgHeight - imgOverlapHeight;
    var contentHeight = windowHeight - headHeight - bottomHeight;
    $('#content').css('height', contentHeight);
    $('#bot').css('height', bottomHeight);
    $('#activity-anchor').css({'bottom': bottomHeight,"width": Math.ceil(windowWidth*0.05)});
    $('#activity-anchor').show();
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

function initWeixin() {
    WeixinApi.ready(function(Api) {
        //正式地址
        var baseUrl = 'http://jxmc.mengniu.com.cn/';
        // var baseUrl = 'http://dev.benbun.com/web/mengniu/';
        // var baseUrl = 'http://mengniujxmc.duapp.com/';
        var imgUrl = baseUrl + 'images/share.jpg';
        // 微信分享的数据
        var wxData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl" : imgUrl,
            "link" : baseUrl,
            "desc" : '蒙牛精选牧场视频直播呈现在您面前，邀您见证蒙牛一点一滴做好奶',
            "title" : "蒙牛牧场在云端"
        };

        var wxCallbacks = {};

        // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
        Api.shareToFriend(wxData, wxCallbacks);

        // 点击分享到朋友圈，会执行下面这个代码
        Api.shareToTimeline(wxData, wxCallbacks);

        // 点击分享到腾讯微博，会执行下面这个代码
        Api.shareToWeibo(wxData, wxCallbacks);
    });
}

var $landscapeTip;
function showLandscapeTip() {
    if (!$landscapeTip) {
        // $landscapeTip = $('<div class="landscape-tip">请翻转手机竖屏浏览</div>');
        // $landscapeTip = $('<div class="landscape-tip"><span class="content">请翻转手机竖屏浏览</span></div>');
        $landscapeTip = $('<div class="landscape-tip"><div class="content"></div><div class="content">请翻转手机竖屏浏览</div></div>');
        $(document.body).append($landscapeTip);
    }
    $landscapeTip.show();
}

function hideLandscpeTip() {
    if ($landscapeTip) {
        $landscapeTip.hide();
    }
}

function initOrientationChange() {
  var updateOrientation=function(){
    var orientation = window.orientation;
    // alert(orientation);
    switch(orientation){
      case 90:
      case -90:
        orientation="landscape";
        showLandscapeTip();
        break;
      default:
        orientation="portrait";
        hideLandscpeTip();
        break;
    }
  };

  window.addEventListener("orientationchange", updateOrientation, false);
  updateOrientation();
  // showLandscapeTip();   // debug
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    }
};

function init() {
    initWeixin();
    initOrientationChange();
}

var Base = {
    init: init,
    initHeights: initHeights,
    liveLayerInitHeights: liveLayerInitHeights,
    indexInitHeights: indexInitHeights,
    GetQueryString: GetQueryString,
    getUrlParam: getUrlParam,
    initWeixin: initWeixin,
    isMobile: isMobile
}

window.Base = Base;

})();


$(document).ready(function(){

 	 /*加载页面foot内容*/

     //var _html="<img src='./images/bot-bg.png' id='bot-img' class='bot-bg'/><div id='nav-container'><span id='left-margin'></span><a id='index' href='index.html'><a id='opencourse' href='opencourse.html'></a><a id='buy' href='buy.html'></a><a id='story' href='http://www.mnnaite.com/ss2/'></a></div>";
     /*var search = window.location.search;
     var _html="<img src='./images/bot-bg.png' id='bot-img' class='bot-bg'/><div id='nav-container'>" +
        "<span id='left-margin'></span>" +
        "<a id='home' href='." + search + "'>" +
        "<a id='opencourse' href='opencourse.html" + search + "'></a>" +
        "<a id='buy' href='buy.html" + search + "'></a>" +
        "<a id='go_prize'></a></div>";

	$("#bot").html(_html);*/

    /*----------------调用精算代码------------------*/
	$('#home').on('click',function(){
	_mz_evt('1000895', '100023789');
	})
	$('#buy').on('click',function(){
	_mz_evt('1000895', '100023787');
	})
	$('#opencourse').on('click',function(){
		_mz_evt('1000895', '100023788');
	})
    $('#story').on('click',function(){
    _mz_evt('1000895', '100023814');
    })



    Base.init();

});


/*-------------------------------添加精算代码-------------------------------------------------*/
_mzh=window._mzh || []; _mzt=window._mzt || []; _mz_dp=window._mz_dp || [];
_mzh.push(
    ['evt._x_utm'], ['evt._x_lid'], ['imp._x_lid'], ['clk._x_lid'],
    ['evt._urlpre', 'http://msg.cn.miaozhen.com/e.gif'],
    ['imp._urlpre', 'http://g.cn.miaozhen.com/x.gif'],
    ['clk._urlpre', 'http://e.cn.miaozhen.com/r.gif']
  );
(function(){
  var mz=document.createElement('script');
  mz.type='text/javascript';mz.async=true;mz.src='http://js.miaozhen.com/t.js';
  var t=document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(mz,t);
})();
function _mz_evt(ae,n) {
	_mzh.push(['evt._set_ae', ae], ['evt._set_n', n], ['evt._send']);
//  console.log('_mz_evt(' + ae + ', ' + n + ')');
}
function _mz_imp(k,p) {
	_mzh.push(['imp._set_k', k], ['imp._set_p', p],['imp._send']);
}
function _mz_clk(k,p) {
	_mzh.push(['clk._set_k', k], ['clk._set_p', p],['clk._send']);

}
function _mz_simple(cmd) {
	_mzh.push(['_simple',cmd]);
}
function _mz_simple_param(n,k,v) {
	_mz_dp[n]=_mz_dp[n]||{};_mz_dp[n][k]=v;
}
function _mz_timer_start(n,u) {
	_mzt.push(n);if(u)_mzh.push([n+'._urlpre',u]);_mz_simple(n+'._timer_start');
}
function _mz_timer_start_x(n,u) {
	for(i=0;i<=_mzt.length;i++)
		_mz_timer_stop(_mzt[i]);
		_mzt=[];
		_mzt.push(n);
		_mz_timer_start(n,u);
}
function _mz_timer_stop(n) {
	_mz_simple(n+'._timer_stop');
}
_mz_simple_param(0,'timer_start',[10,30*60,0,'v','st:$1,si:$2,']);
