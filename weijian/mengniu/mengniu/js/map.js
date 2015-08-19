(function() {


var ROOT = 'http://mengniujxmc.duapp.com';
var IMG_ROOT = ROOT + '/images/';

// 默认衡水牧场
var DEFAULT_PASTURE_ID = 2;

var curPosition;

//地图上标记的工厂、牧场相关信息，对应内容为：工厂/牧场名称，经度，维度，类型，所在地区，对应工厂是数组下标（可选）
var hotspots = [
		["衡水工厂", 115.920118, 38.050513, "factory", "hengshui"],
		["和林工厂", 111.787837, 40.483487, "factory", "helingeer"],
		["衡水牧场", 115.878161, 38.077803, "pasture", "hengshui", 0],
		["赛罕牧场", 111.87056, 40.707612, "pasture", "huhaohaote", 1],
		// ["宿迁牧场", 117.938983, 33.643378, "pasture", "suqian"],
  //       ["宿迁工厂", 118.282808, 33.967381, "factory", "suqian"],
    ];


function setMarkerLabel(poiResult, text) {
    var marker = poiResult.marker;
    var labelOptions = {
         offset: new BMap.Size(20, -20)
    };
    var label = new BMap.Label(text, labelOptions);
    marker.setLabel(label);
}

function doSearchSuperMarket(map) {
    var local = new BMap.LocalSearch(map, {
        renderOptions:{map: map}
    });
    local.searchInBounds("超市", map.getBounds());
}

function routeHotspots(map, start, bid, eid, btype, etype) {
     if (eid > hotspots.length) eid = 0;
    var pasture = hotspots[eid];

    var name = pasture[0];
    var lng = pasture[1];
    var lat = pasture[2];
    var type = pasture[3];
	var distance;
    var driving = new BMap.DrivingRoute(map, {
        renderOptions: {
           map: map,
           autoViewport: true
        },
        onSearchComplete: function(results) {
            var plan = results.getPlan(0);
			distance=plan.getDistance();
        }   ,
        onMarkersSet: function(pois) {
            if (pois.length >= 2) {
                var startPoi = pois[0];
                var endPoi = pois[pois.length-1];
                var startMarker = startPoi.marker;
                var endMarker = endPoi.marker;
                // setMarkerLabel(endMarker, name);
                // factory->pasture
				if(etype=="pasture")
				{
					var isRoutePoint="true";
					setCurrentDistance(distance, endMarker, eid, etype);
					// setCurrentWeather(endMarker, eid);
                    setHotspotMarker(startMarker, bid, btype, isRoutePoint);
					setHotspotMarker(endMarker, eid, type, isRoutePoint);
				}
                // user->factory
				else if(etype=="factory")
				{
                    setUserMarker(startMarker, bid, btype);
					var isRoutePoint="true";
					setCurrentDistance(distance, startMarker, eid, etype);
					setHotspotMarker(endMarker, eid, type, isRoutePoint);
				}
            }
        }
    });

    // if (etype == 'pasture') {
    //     driving.disableAutoViewport();
    // }
    driving.disableAutoViewport();

    var end = new BMap.Point(lng, lat);
    driving.search(start, end);
}

// 将工厂ID转为牧场ID
var idMap = {
    1: 2,
    2: 3,
    3: 5
};
function toPastureId(id) {
    if (id in idMap) {
        return idMap[id];
    }
    return DEFAULT_PASTURE_ID;
}

// 实际id映射成URL中的id
var urlIdMap = {
    0: 1,
    2: 1,
    1: 2,
    3: 2,
    4: 3,
    5: 3
}
function toUrlId(id) {
    if (id in urlIdMap) {
        return urlIdMap[id];
    }
    return 1;
}

// 找您的位置去指定牧场的路径
function findPasturePath(longitude, latitude) {
    var point = new BMap.Point(longitude, latitude);

    // coreMap.centerAndZoom(point, 6);
    // coreMap.enableScrollWheelZoom();

    var pastureId = Base.GetQueryString('id') || 1;
    pastureId = parseInt(pastureId);
    pastureId = toPastureId(pastureId);
    // console.log(pastureId);
    var pasture = hotspots[pastureId];
    var factoryId = pasture[5];
    if (factoryId == null) return;

    var factory = hotspots[factoryId];
    var point2 = new BMap.Point(factory[1], factory[2]);
    // user -> factory
    routeHotspots(coreMap, point, -1, factoryId, "start", factory[3]);
    // factory -> pasture
    routeHotspots(coreMap, point2, factoryId, pastureId, factory[3],  pasture[3]);
}

function getLabelOffset(id) {
    // console.log('getLabelOffset id=' + id);



    // 衡水工厂
    if (id == 0) return new BMap.Size(-63, 25);
    // 衡水牧场
    if (id == 1) return new BMap.Size(30, 25);
    // 呼市赛罕牧场
    if (id == 2) return new BMap.Size(-65, -8);
    // 呼市和林工厂
    if (id == 3) return new BMap.Size(30, 0);
    //宿迁牧场
    if (id == 4) return new BMap.Size(35,20);
    //宿迁工厂
    if (id == 5) return new BMap.Size(30, -5 );
    // return new BMap.Size(30, 5);
}

function getWeatherOffset(id) {
    if (id == 1) return new BMap.Size(-117, -30);
    if (id == 2) return new BMap.Size(-102, -30);
    return new BMap.Size(35, -30);
}

function userDistance(id) {
    if (!curPosition) return 10000;

    var x = hotspots[id][1];
    var y = hotspots[id][2];
    var dx = x - curPosition.longitude;
    var dy = y - curPosition.latitude;
    return Math.sqrt(dx * dx + dy * dy);
}

function getDistanceOffset(id) {
    // console.log('getDistanceOffset id=' + id);

    // debugLog('curPosition: ' + curPosition.longitude + ', ' + curPosition.latitude, true);
    // user->factory
    if (id == 0 || id == 1 || id == 4) {
        // too near
        var dis = userDistance(id);
        debugLog('dis: ' + dis, true);
        if (dis < 4) {
            // return new BMap.Size(0, -80);
            return new BMap.Size(0, -90);
            // return new BMap.Size(-120, 0);
        }
        return new BMap.Size(0, -40);
    }
    // 衡水factory->pasture
    if (id == 2) return new BMap.Size(0, 75);
    // 呼市factory->pasture
    // if (id == 3) return new BMap.Size(0, -45);
    if (id == 3) return new BMap.Size(0, -40);
    // 唐山factory->pasture
    // if (id == 5) return new BMap.Size(0, 60);
    return new BMap.Size(35, 35);
}
function getPositionOffset(id) {
    // console.log('getPositionOffset id=' + id);
    if (id == 0) return new BMap.Size(47, -10);
    if (id == 1) return new BMap.Size(-8, 50);
    return new BMap.Size(-5, -15);
}


function getHotspotName(id) {
    if (id in hotspots) return hotspots[id][0];
    return 'noname';
}

function setUserMarker(marker, id, btype){
    // console.log('setUserMarker btype=' + btype);
    var name = "您的位置";
    marker.setTitle(name);

    var labelOpts = {
        position : marker,
        offset   : getPositionOffset(id)
    }
    var labelHtml = '<div class="pasture-label"><span>' + name + '</span></div>';
    var label = new BMap.Label(labelHtml, labelOpts);
    label.setStyle({
		border: 0,
		padding: 0,
		background:"none"
		});
    // 不显示 您的位置
    // marker.setLabel(label);

    var iconUrl = IMG_ROOT + "user.png";
    var iconWidth = 37;
    var iconHeight = 53;
    var icon = new BMap.Icon(iconUrl, new BMap.Size(iconWidth, iconHeight),
        {
            anchor: new BMap.Size(iconWidth/2, iconHeight)
        }
    );
    marker.setIcon(icon);

    label.addEventListener("click",function(){
    });
    marker.addEventListener("click",function(){
    });
}

function setCurrentWeather(marker, id){

	var city = hotspots[id][4];
	if(city==null)
		city="xinji";
	var url="weather.php?city="+city;
    var name = '当前天气';
    marker.setTitle(name);

    var labelOpts = {
        position : marker,
        offset   : getWeatherOffset(id)
    }
    var labelHtml = '<div id="currentweather" class="weather-label"></div>';

	$.get(url,function(data,status){
	var data1 = eval("("+data+")");
    $("#currentweather").html("<span>"+data1.weatherinfo.weather1+"&nbsp;"+data1.weatherinfo.temp1+"</span");
  });
    var label = new BMap.Label(labelHtml, labelOpts);
	label.setStyle({
        border:"0",
    	padding : "2px 5px",
    	borderRadius: "5px",
        textAlign:"center",
    	background:"url(images/label_bg.png)",
    	// display:"none",
        cursor:"pointer"
    });
    marker.setLabel(label);
    map.addOverlay(marker);

     label.addEventListener("click",function(){
    });
    marker.addEventListener("click",function(){
    });
}



function setCurrentDistance(info, marker, id, etype){
    var name = '牧场距离';
    marker.setTitle(name);

    if (etype == 'pasture') {
        var tip = '牛奶经过'+info+'<br/>到达工厂';
    } else {
        var tip = '牛奶经过'+info+'<br/>到达您手中';
    }
    var labelHtml = '<div  class="path-label"><span>' + tip+ '</span></div>';

    var labelOpts = {
        position : marker,
        offset   : getDistanceOffset(id)
    }
    var label = new BMap.Label(labelHtml, labelOpts);
    	label.setStyle({
        border:"0",
    	padding : "2px 5px",
    	borderRadius: "5px",
        textAlign:"left",
    	background:"url(images/label_bg.png)"
    	// display:"none",
        // cursor:"pointer"
    });

    marker.setLabel(label);
    coreMap.addOverlay(marker);
}



function setHotspotMarker(marker, id, type, isroutepoint){

    var name = getHotspotName(id);
    marker.setTitle(name);

    var labelOpts = {
        position : marker,
        offset   : getLabelOffset(id)
    }
	var labelHtml;
	var iconUrl;
	var _check=false;
	var extclass="";
	if(isroutepoint=="true")
		extclass="routepoint";
	var bgcolor="#6dbc03";
	switch(type)
	{
		case "pasture":
            labelHtml = '<div class="hotspot"><span>' + name + '</span></div>';
			iconUrl = IMG_ROOT + "pasture_marker.png";
			_check=true;
			break;

		case "factory":
			labelHtml = '<div class="hotspot"><span>' + name + '</span></div>';
			iconUrl = IMG_ROOT + "factory_marker.png";
			bgcolor="#835730";
			break;
		}
    var label = new BMap.Label(labelHtml, labelOpts);
	label.setStyle({
		border: "0",
		background: bgcolor,
		padding: "5px",
		borderRadius: "5px",
		color: "white",
		fontFamily: "微软雅黑"
		});
    marker.setLabel(label);


    var iconWidth = 37;
    var iconHeight = 53;
    var icon = new BMap.Icon(iconUrl, new BMap.Size(iconWidth, iconHeight),
        {
            anchor: new BMap.Size(iconWidth/2, iconHeight)
        }
    );
    marker.setIcon(icon);

    label.addEventListener("click",function(){
        // console.log(id + ' clicked');
        // alert(IermuPlayer.LOCATIONS[id].name + ' clicked'); return; // debug
        // debugLog(IermuPlayer.LOCATIONS[id].name + ' clicked');

        IermuPlayer.setVideo(id);

        IermuPlayer.LOCATIONS[id].on_mz_clk();
    });
	if(_check)
	{
		marker.addEventListener("click",function(){
		});
	};
}

function addHotspotMarker(map, point, id, type, isroutepoint){
    var marker = new BMap.Marker(point);
    setHotspotMarker(marker, id, type, isroutepoint);
    map.addOverlay(marker);
}


function hideBubble() {
    $('#bubble').fadeOut();
}

function markHotspots() {
    var beijing = new BMap.Point(116.404, 39.915);
    coreMap.centerAndZoom(beijing, 6);
    coreMap.enableScrollWheelZoom();

    for (var i in hotspots) {
        var hotspot = hotspots[i];
        var point = new BMap.Point(hotspot[1], hotspot[2]);
        var text = hotspot[0];
        var type = hotspot[3];
		var isroutepoint="false";
        addHotspotMarker(coreMap, point, i, type, isroutepoint);
        // 以衡水牧场为中心
        // if (i == 2) {
            // coreMap.centerAndZoom(point, 6);
        // }
    }
    $('#bubble').fadeIn();
    setTimeout(hideBubble, 5000);
    setTimeout(justifyBaiduLogo, 5000);
}

function searchSuperMarket(longitude, latitude, id) {
	var map = new BMap.Map(id);
    var point = new BMap.Point(longitude, latitude);
    var markerOptions = {
        title: '您的位置'
    };
    var marker = new BMap.Marker(point, markerOptions);
    map.centerAndZoom(point,15);
    map.enableScrollWheelZoom();
    map.addOverlay(marker);
    marker.setAnimation(BMAP_ANIMATION_BOUNCE);

    doSearchSuperMarket(map);
}

$("#activity").click(function(){
	clickHeights();
	$("#activity-anchor").show();
	$("#activity").fadeOut("slow");
});

$("#activity-anchor").click(function(){
	$("#activity-anchor").hide();
	$("#activity").fadeIn("slow");
});


function liveReady()
{
	var _html="<img src='./images/live_bot.png' id='bot-live-img' class='bot-live-bg'/><div id='nav-container'><span id='left-margin'></span><a href='knowledge.html'></a></div>";
	$("#bot-live").html(_html);
}

function setPosition(longitude, latitude) {
    // alert(longitude);
    $.cookie('longitude', longitude, {expires: 7});
    $.cookie('latitude', latitude, {expires: 7});
    curPosition = {longitude: longitude, latitude: latitude};
}

function getCachedPosition() {
    var longitude = $.cookie('longitude');
    var latitude = $.cookie('latitude');
    if (longitude && latitude) {
        return {
            longitude: longitude,
            latitude: latitude
        }
    }
    return null;
}


// function onSuccessAdapter(data) {
var onSuccessAdapter = function(data) {
    var lng, lat;
    if (onSuccessAdapter.isCloudaApiAvailable) {
        lng = data.longitude;
        lat = data.latitude;
        //clouda定位坐标系
        location_type = data.coordtype;
    } else {
        lng = data.coords.longitude;
        lat = data.coords.latitude;
        //H5定位坐标系
        location_type = "wgs84ll";
    }
    setPosition(lng, lat);
    if (onSuccessAdapter.onSuccess) {
        onSuccessAdapter.onSuccess(lng, lat);
    }
}

function getCurrentPosition(onPc, onSuccess, onFail) {
    debugLog('getCurrentPosition...');
    if (!Base.isMobile.any()) {
        // debugLog('not mobile', true);
        if (onPc) {
            onPc();
        }
        return;
    }

    var gotCachedPosition = false;
    var position = getCachedPosition();

    // position = { longitude: 111.9, latitude: 40.9}; // debug
    // position = { longitude: 111.805101, latitude: 40.489759}; // debug

    debugLog('position: ' + (position ? position.longitude + ', ' + position.latitude : position), true);
    if (position) {
        onSuccess(position.longitude, position.latitude);
        gotCachedPosition = true;
        curPosition = position;
    }

    var isCloudaApiAvailable = false;
    // 检查User Agent，当环境为Android版本Baidu框时，使用Clouda Geolocation API
    // 检查User Agent，当环境为Android版本轻应用Runtime时，使用Clouda Geolocation API
    if(navigator.userAgent.indexOf("Android") > -1){
        isCloudaApiAvailable = navigator.userAgent.indexOf("BaiduLightAppRuntime") > -1 || navigator.userAgent.indexOf("baiduboxapp") > -1;
    }

    // 如果已拿到缓存的位置，则先调用了onSuccess，不需要在onSuccessAdapter中再调
    onSuccessAdapter.onSuccess = gotCachedPosition ? null : onSuccess;
    onSuccessAdapter.isCloudaApiAvailable = isCloudaApiAvailable;
    // debug
    // var data = {longitude: 116.404, latitude: 39.915};
    // onSuccessAdapter.isCloudaApiAvailable = true;
    // onSuccessAdapter(data);

    isCloudaApiAvailable = false;
    debugLog('isCloudaApiAvailable=' + isCloudaApiAvailable + ', gotCachedPosition=' + gotCachedPosition, true);

    if (!Base.isMobile.any()) {
        if (onPc) {
            onPc();
        }
    } else if (isCloudaApiAvailable) {
        debugLog('clouda.lightInit...', true);
        var lightappApiKey = 'tuIFREy1KkbndzEwU8ElcaQP';
        clouda.lightInit({
            ak: lightappApiKey,
            module: ["geolocation"]
        });
        debugLog('clouda.device.geolocation.get...', true);
        clouda.device.geolocation.get({
            onsuccess: onSuccessAdapter,
            onfail: onFail
        });
    } else if (navigator.geolocation) {
        // 仅用于H5 Geolocation API
        var h5GeoOptions = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 30000
        };

        debugLog('navigator.geolocation.getCurrentPosition...', true);
        navigator.geolocation.getCurrentPosition(onSuccessAdapter, onFail, h5GeoOptions);
    }
}

function justifyBaiduLogo() {
    var BOTTOM = 30;
    $('.anchorBL').css('bottom', BOTTOM);
    $('.BMap_cpyCtrl').css('bottom', BOTTOM);
    // console.log($('.anchorBL'));
    // console.log($('.BMap_cpyCtrl'));
    // console.log(coreMap);
}

var coreMap = null;
function init(mapId) {
    debugLog('init', true);
    coreMap = new BMap.Map(mapId);
    // console.log(coreMap);
    debugLog(coreMap.getSize(), true);
}

var MapManager = {
    hotspots: hotspots,
    init: init,
    toUrlId: toUrlId,
    getCurrentPosition: getCurrentPosition,
    findPasturePath: findPasturePath,
    searchSuperMarket: searchSuperMarket,
    markHotspots: markHotspots
};

window.MapManager = MapManager;

})();