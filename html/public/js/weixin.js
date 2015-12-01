$(document).ready(function() {
	//院校简介与导航
    if(getUrl.schoolId){
		$fun.postAjax("school/getSchooltable",{"id":getUrl.schoolId},function(data){
            //顶部
            $("#solid").append('<img src="http://gkbk67.com/shool_logo/'+getUrl.schoolId+'/cover.jpg" alt="'+data.body.name+'" title="'+data.body.name+'">') 
            $("#wx_head").find('.wx_name').text(data.body.name);
		})
		$fun.postAjax("school/getSchoolOtherInfoList",{"schoolId":getUrl.schoolId},function(data){
            var str = '<ul class="list-unstyled wx_tab_list">';
            for (var i = 0; i < data.body.length; i++) {
                var str1  = '<li>';
                    str1 += '<a href="/wx_school/about.html?schoolId='+getUrl.schoolId+'&id='+data.body[i].id+'">';
                    str1 += '<div class="wx_icon_img">';
                    str1 += '<img src="/wx_school/images/tab('+(i+1)+').png" class="img_size" alt="'+data.body[i].title+'"/>';
                    str1 += '</div>';
                    str1 += '<div class="wx_icon_name">'+data.body[i].title+'</div>';
                    str1 += '</a>';
                    str1 += '</li>';
                str += str1;
                if((i+1)%4==0){
                    str += '</ul>';
                    str += '<ul class="list-unstyled wx_tab_list">';  
                }
                if(i == data.body.length-1){
                    str += '</ul>';
                }

                //about.html简介标题
                if(data.body[i].id==getUrl.id){
                    $("#school_name").text(data.body[i].title);
                }
                
            };
            $("#wx_tab").prepend(str)
		})
    }
    //院校详情页
    if(getUrl.id){
		$fun.postAjax("school/getSchoolOtherInfo",{"articleId":getUrl.id},function(data){
			if(getUrl.id){
                $("#school_content").html(data.body.content);
            }
		})
    }

	//["http://f.com/wx_school/index.html?schoolId=1","http://f.com/wx_school/about.html?schoolId=1&id=1"]
	if(jQuery.parseJSON(window.sessionStorage.getItem("_history_")).length==1){
		$("#arrow_up").css({background:'url("/public/images/icon_home1.png")'})		
	}
	$("#arrow_up").click(function() {
		if(jQuery.parseJSON(window.sessionStorage.getItem("_history_")).length==1){
			 window.location.href="http://"+window.location.host+"/wx_school/index.html?schoolId="+getUrl.schoolId; 
		}else{
			historyUtils.back();
		}
	});
	



});

var historyUtils = {
    add : function (url) {
        var historyArray = historyUtils.getLocal();
        if (!historyArray) {
            historyArray = [];
        }
        var currentPage = historyArray.pop();
        if (currentPage && currentPage == url) {
            //do nothing
        } else if (currentPage){
            historyArray.push(currentPage); //历史里面没有现在传入的url，在加回去
        }
        historyArray.push(url);
        historyUtils.saveLocal(historyArray);
    },
    back : function() {
        var historyArray = historyUtils.getLocal();
        var currentPage = historyArray.pop();//去掉当前页面，pop取最后，类似stack
        var history = historyArray.pop();
        if (!history) {//没有历史页面
            historyUtils.add(currentPage);//将当前页面加入回数组中
            return;
        }
        historyUtils.saveLocal(historyArray);
        window.location.href = history;
    },
    getLocal : function() {
        var result = window.sessionStorage.getItem(historyUtils.key);
        if (!result) {
            return null;
        }
        return JSON.parse(result);
    },
    saveLocal : function(data) {
        window.sessionStorage.setItem(historyUtils.key, JSON.stringify(data));
    },
    init : function() {
        historyUtils.saveLocal([]);
    },
    key : "_history_"
}
historyUtils.add(window.location.href);