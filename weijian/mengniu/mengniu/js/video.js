
(function() {

// var DEBUG_MOBILE_MODE = false;
var DEBUG_MOBILE_MODE = true;
var DEFAULT_PASTURE_ID = 2;

var UK = '1984932545';

var FACTORY = 'factory';
var PASTURE = 'pasture';

// 摄像设备
function Device(type, name, deviceId, shareId, showName, evt, clk) {
  this.type = type;
  this.name = name;
  this.deviceId = deviceId;
  this.shareId = shareId;
  this.showName = showName;
  this.posterImg = 'images/poster/' + deviceId + '.jpg';

  //精算参数
  this.mz_evt = evt;
  this.mz_clk = clk;
}

Device.prototype.on_mz_clk = function() {
  _mz_evt('1000895', this.mz_evt);
  _mz_clk('1015169', this.mz_clk);
}

// 地点
function Location(type, name, city, devices, desc, nearbyPastures, evt, clk) {
  this.type = type;
  this.name = name;
  this.city = city;
  this.devices = devices;
  this.desc = desc;
  var items = [];
  for (var i in nearbyPastures) {
    items.push('<p>' + nearbyPastures[i] + '</p>');
  }
  this.nearbyPasturesHtml = items.join('');

  //精算参数
  this.mz_evt = evt;
  this.mz_clk = clk;
}

Location.prototype.on_mz_clk = function() {
  _mz_evt('1000895', this.mz_evt);
  _mz_clk('1015169', this.mz_clk);
}

var desciptions = [
    '全国首家“前厂后牧”设计的蒙牛衡水工厂，设计博采全球乳品工厂设计之众长，新鲜的牛奶仅需18分钟即可到达灌装工厂，最大程度保证原奶的新鲜风味及香浓口感，用心做好一点一滴，只为让您品尝到精选好牛奶。',
    '来自牧场的牛奶在这里完成无菌化灌装，多亏有两位来自欧洲的小伙伴——瑞典利乐、德国康美的帮助，牛奶灌装过程全程真空，杜绝一切污染，保留每一滴牛奶的新鲜、纯净，一点一滴的好！如果你来内蒙古旅游，一定要来看看哦！"',
    '欢迎来到富源牧业衡水牧场，“快乐生活、幸福产奶”是欧洲先进管理理念下的精选牧场必须要有的“动物福利”观念，在这里每头奶牛都衣食无忧：精选饲料、定期体检、音乐产奶，精选的牧场，自然是精选的好牛奶。',
    '哞~欢迎来参观富源牧业塞罕牧场，这里的奶牛祖籍荷兰，牛均居住面积66.7平方米，美味饲料、独立卧位、大运动场还有音乐表演，无忧无虑的牛生专注一件事情：一点一滴的精选好牛奶！',
    '蒙牛乳业（唐山）有限责任公司2003年成立，占地面积15.34万平方米，主要生产纯牛奶、早餐奶、酸酸乳、儿童奶，日生产能力1494吨，13条利乐TBA/22型灌装机，3条利乐TBA/19型灌装机,2条中亚瓶酸生产线。整个生产过程均采用集中控制系统，是唐山地区现代化程度最高、生产规模最大的乳制品加工龙头企业。',
    '哞~ 欢迎来到兴业牧场，牧场坐落于有悠久养殖业历史的唐山市汉沽区，与天津市滨海新区仅一路之隔。兴业牧场是农业部首批标准化示范牧场，采用现代标准化管理，所以这里的每一头奶牛都得到精心的照料—精心调配的配方饲料、取自230米的天然地下水、夏季还有降温系统，欢迎你来一起探究精选好牛奶的秘诀哦！'
];

var nearbyPastures = [
    ['富源牧业衡水牧场','景县爱民牧场','武强镇和谐牧场','武强县东海牧场','河北绿奥牧场','辛集市鑫星牧场'],
    ['富源牧业赛罕牧场','呼和浩特宏奕牧场','呼和浩特伊百康牧场','和林格尔县泰佳源牧场','和林格尔县蒙德隆牧场','和林格尔县星原牧场'],
    ['景县爱民牧场','武强镇和谐牧场','武强县东海牧场','河北绿奥牧场','辛集市鑫星牧场'],
    ['呼和浩特宏奕牧场','呼和浩特伊百康牧场','和林格尔县泰佳源牧场','和林格尔县蒙德隆牧场','和林格尔县星原牧场'],
    ['唐山天成牧场','天津天宇牧场','唐山国富牧场','唐山京丰牧场','秦皇岛宏顺牧场','承德巨鑫牧场'],
    ['唐山天成牧场','天津天宇牧场','唐山国富牧场','唐山京丰牧场','唐山汉沽兴业牧场','秦皇岛宏顺牧场','承德巨鑫牧场']
];

var DEVICES = [
  new Device(FACTORY,  '已上线-和林工厂-生产1', '137893585291', 'd891bfb3cf17003ddeb3c639b5e26bfd', '生产1','100023807','4-YMn0')
  ,new Device(FACTORY, '已上线-和林工厂-生产2', '137893578475', 'ea3442073ea06f0afc74bbd2fa4935de', '生产2','100023808','4-YMo0')
  ,new Device(PASTURE, '已上线-赛罕牧场-挤奶1', '137893646651', '3d1a71788eb401e6c2cab2ecf5d0edd5', '挤奶1','100023803','4-YMd0')
  ,new Device(PASTURE, '已上线-赛罕牧场-挤奶2', '137893600139', 'bc5ebe9193de9e6588433939c638192e', '挤奶2','1984932545 ','4-YMe0')
  ,new Device(FACTORY, '已上线-衡水工厂-生产1', '137893636811', 'fc85da0c4cf4ebbf030e9e0502bbb092', '检验','100023795','4-YM90')
  ,new Device(FACTORY, '已上线-衡水工厂-生产2', '137893637259', '0a3e134d33f8fca61df838af2f210c52', '生产','100023796','4-YMA0')
  ,new Device(PASTURE, '已上线-衡水牧场-牛舍1', '137893640203', '3e9a8e03b82915d4f75ddab8e6b7b5fe', '牛舍1','1984932545 ','4-YM-0')
  ,new Device(PASTURE, '已上线-衡水牧场 牛舍2', '137893637099', 'ce795d0ab89e575365caeba07a88723a', '牛舍2','1984932545  ','4-YM00')
  ,new Device(PASTURE, '已上线-宿迁牧场-牛舍1', '137893226123', '9179e90259b8ac2ffd57cb21ea432faf', '牛舍1','100023791','4-YM-0')
  ,new Device(PASTURE, '已上线-宿迁牧场-牛舍2', '137893229515', 'ec707cb2fa7cd3c5c723147367595526', '牛舍2','100023792','4-YM00')
  ,new Device(PASTURE, '已上线-宿迁工厂-工厂1', '137893392075', '1cdb779504cd13b06ffdcd329f8713c9', '挤奶1','100023791','4-YM-0')
  // ,new Device(PASTURE, '已上线-宿迁工厂-牛舍2', '137893216059', 'b19bc608a06972b414761794a4a0f202', '牛舍2','100023792','4-YM00')
];

var LOCATIONS = [
  new Location(FACTORY, '衡水工厂', '衡水', [DEVICES[4], DEVICES[5]], desciptions[0], nearbyPastures[0], '100023794', '4-YM80'),
  new Location(FACTORY, '和林工厂', '呼和浩特', [DEVICES[0], DEVICES[1]], desciptions[1], nearbyPastures[1], '100023806', '4-YMm0'),
  new Location(PASTURE, '衡水牧场', '衡水', [DEVICES[6], DEVICES[7]], desciptions[2], nearbyPastures[2], '100023790', '4-YM+0'),
  new Location(PASTURE, '赛罕牧场', '呼和浩特', [DEVICES[2], DEVICES[3]], desciptions[3], nearbyPastures[3], '100023802', '4-YMc0')
  // ,new Location(FACTORY, '宿迁牧场', '宿迁', [DEVICES[8], DEVICES[9]], desciptions[4], nearbyPastures[4], '100023800', '4-YMS0'),
  // new Location(PASTURE, '宿迁工厂', '宿迁', [DEVICES[10], DEVICES[10]], desciptions[5], nearbyPastures[5],'100023798','4-YMI0')
];

// 寻找答案go 对应的
var knowledgeGo=[
				['100023797','4-YMH0'],
				['100023809','4-YMv0'],
				['100023793','4-YM70'],
				['100023805','4-YMl0'],
				['100023801','4-YMb0'],
				['100023799','4-YMR0']
			]

var gPastureId = DEFAULT_PASTURE_ID;
var curDeivce = null;

function playError() {
}

var camPlayer = null;
function playLive(vid, id) {
  var width = $('#player-box').width();
  var shareid = LOCATIONS[vid].devices[id].shareId;
  var uk = UK;
	var camOption = {
        "container":"live-player",
        "shareid":shareid,
        "uk":uk,
        "width":width,
        "autoStart":"true"
    };
	camPlayer = new Baiducam(camOption);
	camPlayer.play(playError);
	$('#live-player').show();
	$('#live-player_wrapper').show();
}

function stopLive() {
	// TODO
	$('#live-player').hide();
	$('#live-player_wrapper').hide();
	camPlayer = null;
}

function doPlayMobile(url, isVideo, isOffline) {
  debugLog('doPlayMobile', true)
	var video = document.getElementById('mobile-player');
	video.pause();
	if (video.currentTime > 0) {
		video.currentTime = 0;
	}
	video.src = url;
  // android自动播放
  // if (Base.isMobile.Android()) {
  //   video.autoplay = true;
  //   video.play();
  // }

	if (isVideo === true) {
		$('#live-title img').attr('src', 'images/video.jpg');
	} else {
		$('#live-title img').attr('src', 'images/live.png');
	}
  setPlayTip(isOffline);
}

function extractVideoUrl(data) {
  if (data.div) {
    var html = data.div;
    var match = html.match(/src\s*=\s*[\"\'](http.*?m3u8.*?)[\"\']/);
    if (match) {
      var url = match[1];
      return url;
    }
  }
  return null;
}

function playMobileCallback(data) {
  console.log(data);
  var url = extractVideoUrl(data);
	if (url) {
    console.log(url);
		var isVideo = (isVideoTime() || (data.status <= 1));
    var isOffline = false;
    if (!isVideoTime() && isVideo === true) {
      isOffline = true;
    }
		doPlayMobile(url, isVideo, isOffline);
		return;
	}
	// 不能播iermu视频统一播录像
  // console.log(curDeivce);
	var url = getVideoUrl(curDeivce.deviceId);
  var isOffline = !isVideoTime();
	doPlayMobile(url, true, isOffline);
}


function playMobileCallback2(data) {
  console.log('playMobileCallback2', data);
  var url = extractVideoUrl(data);
  if (url && data.status > 1) {
    doPlayMobile(url, false, false);
    return;
  }
  // 不能播iermu视频统一播录像
  // console.log(curDeivce);
  var url = getVideoUrl(curDeivce.deviceId);
  doPlayMobile(url, true, true);
}

function isVideoTime() {
  // return false; // debug
	var now = new Date();
	var hours = now.getHours();
	if (hours < 9 || hours >= 27) {
		return true;
	}
	return false;
}

// 注意，需要把录像传到云存储上
function getVideoUrl(deviceId) {
	// return 'http://bcs.duapp.com/mengniu-video/cowshed.mp4';	// debug
	return 'http://bcs.duapp.com/mengniu-video/' + deviceId + '.mp4';
}

// 根据是否离线设置不同提示
function setPlayTip(isOffline) {
  var tip = '直播时间 09:00-17:00';
  if (isOffline === true) {
    if (curDeivce.type == PASTURE) {
      tip = '哞～ 网络有点卡～';
    } else {
      tip = '网络有点小故障哦～';
    }
  }
  $('#live-title-text').text(tip);
}


function playMobileLive(vid, id) {
  var device = LOCATIONS[vid].devices[id];
  var shareid = device.shareId;
  var uk = UK;
  // console.log('vid=' + vid + ', id=' + id + ', shareid=' + shareid);
  curDeivce = device;
  // 录像统一由iermu接口控制
  // if (isVideoTime()|| device.deviceId == 137893640203 ) {//如果需哟啊强制某个视频播放录播，可以添加deviceid
  if (isVideoTime()) {
    var deviceId = device.deviceId;
  	var url = getVideoUrl(deviceId);
  	doPlayMobile(url, true,true);
  } else {
    $.getJSON('iermu.php',
        {shareid: shareid, uk: uk},
        playMobileCallback2
    );
  }
  $('#mobile-player-container').show();
}



function stopMobileLive() {
  $('#mobile-player').attr('src', '');
  $('#mobile-player-container').hide();
}


function playVideo(id) {
	var ROOT = 'http://dev.benbun.com/web/video/mengniu/';
	// id = 0; // test
	var src = ROOT + id + '.mp4';
	$('#video-player').attr('src', src);
	$('#video-player-container').show();
}

function stopVideo() {
	$('#video-player-container').hide();
	$('#video-player').attr('src', '');
}

function play(vid, index) {
  // console.log('vid=' + vid + ', index=' + index);

  var location = LOCATIONS[vid];
  curDeivce = location.devices[index];
  $('#mobile-player-container').empty();
  $('#mobile-player-container').html('<video id="mobile-player" src="" controls loop width="100%" poster="images/player-bg.jpg"></video>');

  // 设置不同摄像头的poster
  $('#mobile-player').attr('poster', curDeivce.posterImg);

  var playMobile = Base.isMobile.any();
 	if (DEBUG_MOBILE_MODE === true || playMobile) {
 		stopLive();
    playMobileLive(vid, index);
		// VideoPlayClick();
 	} else {
    stopMobileLive();
 		playLive(vid, index);
 	}
}




/*********************************************************************************************/
function initPastureSelect(city) {
    $('#pasture-select-title-text').text('选择牧场');
    $('#pasture-select-options').hide();
    var html = $('#pasture-select-options').data(city);
    if (!html) {
        var pastures = CITY2PASTURES[city];
        html = '';
        for (var i in pastures) {
            html += '<li>' + pastures[i] + '</li>';
        }
        $('#pasture-select-options').data(city, html);
    }
    $('#pasture-select-options').html(html);

    $('#pasture-select .select-options li').click(function() {



        $(this).parent().hide();
        $('#pasture-select-title-text').text($(this).text());
    });
}

function initSelect() {
    $('.select-title').click(function() {
        $(this).next().toggle();
    });

    $('.select-options').hide();

    $('#city-select .select-options li').click(function() {
        $(this).parent().hide();
        var city = $(this).text();
        if ($('#city-select-title-text').text() != city) {
            $('#city-select-title-text').text(city);
            initPastureSelect(city);
        }
    });
}

function nextSlide(){
	var $ctn = $("#title-container");
	var ctnWidth = $ctn.width();
	var boxWidth = Math.ceil(ctnWidth*0.5);
    var $boxCtn =  $ctn.find("> div");
	var curMgleft = parseInt($boxCtn.css("marginLeft")) || 0;
	curMgleft -= (boxWidth+3);
	var boxLen = $boxCtn.find(".title-box").length;
	var limit = -(boxLen-3)*(boxWidth+4);
	if(curMgleft<limit) return false;
	if(! window.SlideAnimationFinish) return false;
	window.SlideAnimationFinish = false;
	$boxCtn.animate({marginLeft:curMgleft},
					"fast",
					"",
					function(){
						window.SlideAnimationFinish = true;
					});
}

function prevSlide(){
	var $ctn = $("#title-container");
	var ctnWidth = $ctn.width();
	var boxWidth = Math.ceil(ctnWidth*0.33333) - 3;
    var $boxCtn =  $ctn.find("> div");
	var curMgleft = parseInt($boxCtn.css("marginLeft")) || 0;
	if(curMgleft>=0) return false;
	if(!window.SlideAnimationFinish) return false;
	curMgleft += (boxWidth+3);
	window.SlideAnimationFinish = false;
	$boxCtn.animate({marginLeft:curMgleft},
					"fast",
					"",
					function(){
						window.SlideAnimationFinish = true;
					});
}
function initSlide(){
	$("#next-btn").click(nextSlide);
	$("#prev-btn").click(prevSlide);
    // TODO
    var ctnWidth = $('#live-nav').width() ;
    $('#title-container').css('width', ctnWidth);
	var boxWidth = parseInt( ctnWidth*0.5 );
	$(".title-box").css("width",boxWidth);
	$(".title-box-selected").css("width",boxWidth);
	window.SlideAnimationFinish = true;
}

function displayRouteInfo(){
	$('#currentweather').show();
	$('.path-label-right').show();
	$('.path-label').show();
}
function initSwipe() {
    $('#title-container').touchwipe({
        wipeRight: prevSlide,
        wipeLeft: nextSlide
    });

}

function onClickVideoBtn(index) {
  // alert('onClickVideoBtn');
  var vid = gPastureId;
  $('.title-box').removeClass("video-btn-selected")
    .eq(index).addClass("video-btn-selected");
  play(vid, index);
  // ------------调用精算代码------------
  curDeivce.on_mz_clk();
}

function initVideoBtn() {
	var vid = gPastureId;
  $('.selected_triangle_down').hide();
  $('.title-box').click(function(e) {
    // alert('title-box clicked');
    var index = $(this).parent().index();
    onClickVideoBtn(index);
  });

  var videoPageWidth = $('#video_layer_content').width();
  var maxVideoHeight = videoPageWidth * 0.566;
  $('#mobile-player').css('max-height', maxVideoHeight);
}

function VideoPlayClick()
{

	var ctnWidth = $(window).width()*0.45;

	if(!Base.isMobile.iOS())
	{
		$("#mobile-player-container").css({"width":$(window).width()*0.765, "height":ctnWidth});
		$("#mobile-player-frontier").css({"width":$(window).width()*0.765, "height":ctnWidth});
		$("#mobile-player").css({"height":ctnWidth});
		$("#player-box").find("img").addClass("mobile-player-img-android");
		$("#player-box").find("#mobile-player-icon").css({"top":"35%"});

	}else
	{
		$("#mobile-player-container").css({"width":$(window).width()*0.765, "height":ctnWidth*1.1});
		$("#mobile-player-frontier").css({"width":$(window).width()*0.765, "height":ctnWidth*1.1});
		$("#mobile-player-frontier-img").css({"width":$(window).width()*0.765, "height":ctnWidth*1.1});
		$("#mobile-player").css({"height":ctnWidth*1.1});
	}

	$("#mobile-player-container").show();
	$("#player-box").find("#mobile-player-icon").show();
	$("#mobile-player").hide();

	var media = document.getElementById("mobile-player");
	if(media.paused)
		{
			$("#player-box").find(".mobile-player-front").show();
			$("#player-box").click(function(){

				{
					$("#player-box").find(".mobile-player-front").hide();
					$("#mobile-player").show();
					media.play();
				}
			});
		}
	else
	{
			$("#player-box").find(".mobile-player-front").hide();
			$("#mobile-player").show();

	}
}

function displayVideoBtn()
{
		//因为没有next-btn 图片了， 所以onload的时间就会出错；
		//var img = document.getElementById('next-btn');
		//img.onload = null;
		//img.src = '';
		//img.onload = function(){

			var ctnWidth = $('#live-nav').width();

			$('#title-container').css('width', ctnWidth);
			var boxWidth = Math.ceil(ctnWidth*0.5);
			$(".title-box").css("width",boxWidth);
			$(".title-box-selected").css("width",boxWidth);
			$(".title-box").show();
			$(".title-bottom").show();
		//};
		//img.src = 'images/icon_right.png';
}

var showedVideoPage = false;
function autoSelectVideoBtn() {
  debugLog('autoSelectVideoBtn] showedVideoPage=' + showedVideoPage, true);
  var $videoBtns = $('.title-box');
  if ($videoBtns.length >= 3) {
      // $videoBtns[1].click();
      onClickVideoBtn(1);
  } else if ($videoBtns.length > 0) {
      // $videoBtns[0].click();
      onClickVideoBtn(0);
  }
}

function slideShowVideoPage() {
  debugLog('slideShowVideoPage] showedVideoPage=' + showedVideoPage, true);
  if (showedVideoPage) return;
  showedVideoPage = true;

  // autoSelectVideoBtn();
}

function noslideShowVideoPage() {
  debugLog('noslideShowVideoPage] showedVideoPage=' + showedVideoPage, true);
  if (showedVideoPage) return;
  showedVideoPage = true;

  /*$("#video_layer").stop(true).show().css({left: 0});*/
  $("#video_layer").hide();
  // autoSelectVideoBtn();
}

var hidedVideoPage = false;
function slideHideVideoPage() {
  debugLog('slideHideVideoPage] hidedVideoPage=' + hidedVideoPage, true);
  if (hidedVideoPage) return;
  hidedVideoPage = true;

  $("#video_layer").hide();
}

function noslideHideVideoPage() {
  debugLog('noslideHideVideoPage] hidedVideoPage=' + hidedVideoPage, true);
  if (hidedVideoPage) return;
  hidedVideoPage = true;

  $("#video_layer").css({left:$(window).width()}).hide();
}


function setVideo(id){
  console.log('setVideo id',id);
	var value = "";
	if(id == -1) {
		var vid = getUrlParam("id") || DEFAULT_PASTURE_ID;
	} else {
		var vid = id;
	}
	gPastureId = vid;

  showedVideoPage = false;
  /*$("#video_layer").show().animate({left:0}, 'fast', '', slideShowVideoPage);*/
  $("#video_layer").hide();
  setTimeout(noslideShowVideoPage, 500);
  debugLog('#video_layer.animate', true);

  var location = LOCATIONS[vid];
  var devices = location.devices;
  if (devices.length == 0) {
    $('#wrap-live').hide();
  } else {
    $('#wrap-live').show();
  }
	$('#nearbyRanch').html(location.nearbyPasturesHtml);
	$('.hotspot-content').html(location.desc);

	// $("#video_layer").show();
	// $("#bottom-live-img").animate({left:$(window).width()*0.15});
	// $("#video_layer").animate({left:0});
	// console.log('vid=' + vid + ', isvideoDisplay=' + isvideoDisplay);

  $(".hotspot-name").text(location.name);

  var navHtml = '';
  devices.forEach(function(device) {
    navHtml += "<div class='slide-btn-column'>"
       +"<div class='title-box'>"
       //之前的布局是有img 和span 标签，不好控制。
       //+"<a href='javascript:' class='video-btn'><img src='images/live_tit.png' /><span class='title-text'>"+val+"</span></a>"

       //现在是把img当成了span的背景便于控制。
       +"<a href='javascript:' class='video-btn'><span class='title-text' >" + device.showName + "</span></a>"
       +"</div>"
       +"</div>";
  });
  $("#title_nav").html(navHtml);

	var urlId = MapManager.toUrlId(vid);
	$("#knowledge").attr("href", "knowledge.html?id="+urlId);

	var  evt_clk = knowledgeGo[vid]
	$("#knowledge").click(function(){
		 _mz_evt( '1000895' , evt_clk[0] );
		 _mz_clk( '1015169' , evt_clk[1] );
	});

  debugLog('before displayVideoBtn', true);
	displayVideoBtn();
  init();
  autoSelectVideoBtn();
  debugLog('setVideo done', true);
}

function init() {
  // initSelect();
  // initSlide();
  // initSwipe();
  // window.addEventListener("resize",initSlide,false);
  initVideoBtn();

  $("#video_layer_margin").click(function(){
      $('#mobile-player').attr('src', '');

      hidedVideoPage = false;
      /*$("#video_layer").animate({left:$(window).width()}, 'fast', '', slideHideVideoPage);*/
      $("#video_layer").hide();
      setTimeout(noslideHideVideoPage, 500);
  });

}

var IermuPlayer = {
  DEVICES: DEVICES,
  LOCATIONS: LOCATIONS,
  extractVideoUrl: extractVideoUrl,
	setVideo: setVideo
	// init: init
};

debugLog('video.js v=' + 1);

window.IermuPlayer = IermuPlayer;

})();
