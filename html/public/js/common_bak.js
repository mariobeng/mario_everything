var getUrl,
    _url = "http://123.56.114.10:8080/biz/",
    $fun = {
        //加载页面
        loadUrl: function (divId, durl, fun) {
            var $divId = $("#" + divId);
            $divId.load(durl, fun);
        },
        tabs: function (tabli) {
            $("." + tabli).each(function () {
                var _this = $(this)
                var a = _this.find("li.active").index();
                _this.next().children(".item").eq(a).siblings().hide();
                _this.find("li").each(function (i) {
                    $(this).click(function () {
                        $(this).addClass("active").siblings().removeClass("active");
                        _this.next().children().eq(i).show().siblings().hide();
                    })
                })
            })
        },
        //转换json字符串 {'body':{'username':'13325484607','password':'123123'}}$fun.ajax(url,$fun.GetJsonData(),1)
        ajax: function (setUrl, jsondata, type) {
            $.ajax({
                url: _url + setUrl,
                type: "post",
                data: JSON.stringify($fun.GetJsonData(jsondata))||"",
                dataType: "json",
                timeout: 50000,
                success: function (data) {
                    if(type){
                        tel._success(data, setUrl, type);
                    }else{
                        tel._success(data, setUrl);
                    }                    
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.responseText + "====" + errorThrown);
                }
            });
        },
        postAjax: function (setUrl, jsondata, successfn, errorfn) {
            $.ajax({
                url: _url + setUrl,
                type: "post",
                data: JSON.stringify($fun.GetJsonData(jsondata))||"",
                dataType: "json",
                timeout: 50000,
                success: function (data) {
                    successfn(data);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    errorfn(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        },
        serializeJson: function (jsonData) {
            var serializeObj = {};
            for (var i = 0; i < jsonData.length; i++) {
                serializeObj[jsonData[i].name] = jsonData[i].value;
            }
            return serializeObj;
        },
        GetJsonData: function (data) {
            var _json = {
                "body": data,
                "md5": "aaa"
            };
            return _json;
        },

        //弹窗
        modal: function (obj,width,height) {
            var _obj = $("#"+obj);
            _obj.css({width:width, height:height, marginTop:-height, marginLeft:-width/2});
            _obj.show();
            _obj.animate({marginTop:-height/2}, 100)
            _obj.prev().show();
            _obj.find(".modal_content").height(height-55);
            //关闭弹出框
            _obj.find(".close_modal").click(function(){
                $("body").css({overflow:"auto", paddingRight:0})
                _obj.hide();
                _obj.prev().hide();
                $(document).off("scroll");
            })
            var scrollTop = $("body").scrollTop();
            $(document).on('scroll',function() {
              $("body").scrollTop(scrollTop);
            });
        },
        //用户中心左右相等
        Contour: function (leftId, rightId) {
            var left_H = $("#" + leftId).outerHeight();
            var right_H = $("#" + rightId).outerHeight();
            if (left_H > right_H) {
                $("#" + rightId).height(left_H - 40)
            } else {
                $("#" + leftId).height(right_H)
            }
        },
        getUrlRequest: function () {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                if (str.indexOf("&") != -1) {
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                    }
                } else {
                    var key = str.substring(0, str.indexOf("="));
                    var value = str.substr(str.indexOf("=") + 1);
                    theRequest[key] = decodeURI(value);
                }
            }
            return theRequest;
        },
        solid:function(){
            var t = n = 0, count;
            $(document).ready(function() {
                count = $("#playShow a").size();
                $("#playShow a:not(:first-child)").hide();
                $("#playNum a:first").addClass('active');
                var i=0;
                if($("#playNum a").length>1){
                    $("#playNum a").click(function() {
                       i = $(this).index();
                       n = i;
                       if (i >= count) return;
                       $("#playShow a").filter(":visible").hide().parent().children().eq(i).fadeIn(1200);
                       $(this).addClass('active').siblings().removeClass('active');
                    });
                }
                $("#prev").click(function(){
                    n--;
                    $("#playNum a").eq(n).trigger('click');
                })
                $("#next").click(function(){
                    n = n >= (count - 1) ? 0 : ++n;
                    $("#playNum a").eq(n).trigger('click');
                })

                // t = setInterval("showAuto()", 5000);
                // $("#play").hover(function(){
                //     clearInterval(t)
                // }, function(){
                //     t = setInterval("showAuto()", 5000);
                // });
            });
            // function showAuto(){
            //     n = n >= (count - 1) ? 0 : ++n;
            //     $("#playNum a").eq(n).trigger('click');
            // };
        },
        //网站导航
        nav: function () {
            var navData = [
                {
                    "id": 1,
                    "title": "首页",
                    "url": "/"
                },
                {
                    "id": 2,
                    "title": "志愿",
                    "children": [
                        {
                            "id": 21,
                            "title": "选院校",
                            "url": "/school/index.html"
                        },
                        {
                            "id": 22,
                            "title": "选专业",
                            "url": "/school/professional.html"
                        }
                    ]
                },
                {
                    "id": 3,
                    "title": "指南",
                    "url": "/new/list.html"
                },
                {
                    "id": 4,
                    "title": "发现",
                    "url": "/find/index.html"
                },
                {
                    "id": 5,
                    "title": "查数据",
                    "url": "/",
                    "children": [
                        {
                            "id": 51,
                            "title": "各省分数线查询",
                            "url": "/search/index.html"
                        },
                        {
                            "id": 52,
                            "title": "专业分数线查询",
                            "url": "/"
                        },
                        {
                            "id": 53,
                            "title": "院校分数线查询",
                            "url": "/"
                        },
                        {
                            "id": 54,
                            "title": "招生计划",
                            "url": "/"
                        },
                        {
                            "id": 55,
                            "title": "按专业查",
                            "url": "/"
                        },
                        {
                            "id": 56,
                            "title": "报考经历",
                            "url": "/"
                        }

                    ]
                }
            ];
            Recursive($("#nav"), navData);
            function Recursive(obj, data) {
                for (var i = 0; i < data.length; i++) {
                    var str;
                    if (data[i].children) {
                        str = '<li><a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + data[i].title + '<span class="caret"></span></a><ul class="dropdown-menu nav_' + data[i].id + '"></ul></li>'
                    } else {
                        str = '<li><a href="' + data[i].url + '">' + data[i].title + '</a></li>';
                    }
                    obj.append(str)
                    if (data[i].children) {
                        Recursive($(".nav_" + data[i].id), data[i].children);
                    }
                }
            }


        }
    };
//jquery.session
;
(function ($) {

    $.session = {

        _id: null,

        _cookieCache: undefined,

        _init: function () {
            if (!window.name) {
                window.name = Math.random();
            }
            this._id = window.name;
            this._initCache();

            // See if we've changed protcols

            var matches = (new RegExp(this._generatePrefix() + "=([^;]+);")).exec(document.cookie);
            if (matches && document.location.protocol !== matches[1]) {
                this._clearSession();
                for (var key in this._cookieCache) {
                    try {
                        window.sessionStorage.setItem(key, this._cookieCache[key]);
                    } catch (e) {
                    }
                    ;
                }
            }

            document.cookie = this._generatePrefix() + "=" + document.location.protocol + ';path=/;expires=' + (new Date((new Date).getTime() + 120000)).toUTCString();

        },

        _generatePrefix: function () {
            return '__session:' + this._id + ':';
        },

        _initCache: function () {
            var cookies = document.cookie.split(';');
            this._cookieCache = {};
            for (var i in cookies) {
                var kv = cookies[i].split('=');
                if ((new RegExp(this._generatePrefix() + '.+')).test(kv[0]) && kv[1]) {
                    this._cookieCache[kv[0].split(':', 3)[2]] = kv[1];
                }
            }
        },

        _setFallback: function (key, value, onceOnly) {
            var cookie = this._generatePrefix() + key + "=" + value + "; path=/";
            if (onceOnly) {
                cookie += "; expires=" + (new Date(Date.now() + 120000)).toUTCString();
            }
            document.cookie = cookie;
            this._cookieCache[key] = value;
            return this;
        },

        _getFallback: function (key) {
            if (!this._cookieCache) {
                this._initCache();
            }
            return this._cookieCache[key];
        },

        _clearFallback: function () {
            for (var i in this._cookieCache) {
                document.cookie = this._generatePrefix() + i + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            }
            this._cookieCache = {};
        },

        _deleteFallback: function (key) {
            document.cookie = this._generatePrefix() + key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            delete this._cookieCache[key];
        },

        get: function (key) {
            return window.sessionStorage.getItem(key) || this._getFallback(key);
        },

        set: function (key, value, onceOnly) {
            try {
                window.sessionStorage.setItem(key, value);
            } catch (e) {
            }
            this._setFallback(key, value, onceOnly || false);
            return this;
        },

        'delete': function (key) {
            return this.remove(key);
        },

        remove: function (key) {
            try {
                window.sessionStorage.removeItem(key);
            } catch (e) {
            };
            this._deleteFallback(key);
            return this;
        },

        _clearSession: function () {
            try {
                window.sessionStorage.clear();
            } catch (e) {
                for (var i in window.sessionStorage) {
                    window.sessionStorage.removeItem(i);
                }
            }
        },

        clear: function () {
            this._clearSession();
            this._clearFallback();
            return this;
        }

    };

    $.session._init();
    getUrl = $fun.getUrlRequest()
})(jQuery);