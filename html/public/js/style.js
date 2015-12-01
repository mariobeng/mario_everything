/**
 * Created by Administrator on 2015/10/24.
 */
$(document).ready(function(){
    $fun.loadUrl("header","/public/header.html", function(){
        tel.login();
        $fun.nav();
    });

    $fun.loadUrl("new_hot_box","/public/new_hot_list.html");

    switch (window.location.pathname) {        
        case "/new/list.html":
            //调用新闻分类, 列表名称
            new_list()
            if(getUrl.typeid){
                //根据typeid获取列表
                $fun.postAjax("article/getArticleList",{"fenleiId":getUrl.typeid,"fid":"0","fstate":"0"},function(data){
                    var str = '';
                    for (var i = 0; i < data.body.length; i++) {
                        str += '<dl>';
                        if(data.body[i].img){
                            str += ' <dt><a href="/new/show.html?cate_id='+data.body[i].articlecate_id+'&id='+data.body[i].id+'"><img src="http://img.youzy.cn/uploadfiles/2015/10/16/16103245820774.jpg" class="img-responsive" alt=""/></a></dt>';  
                        };
                        str += '    <dd>';
                        str += '        <h4><a href="/new/show.html?cate_id='+data.body[i].articlecate_id+'&id='+data.body[i].id+'">'+data.body[i].title+'</a></h4>';
                        str += '        <div class="zhaiyao">'+data.body[i].summary+'</div>';
                        str += '        <div>时间：<span>'+data.body[i].createTime+'</span> | 来源：<span>'+data.body[i].source+'</span></div>';
                        str += '    </dd>';
                        str += '</dl>';                    
                    };
                    $("#new_list").html(str)
                }); 
            }else{
                //默认列表
                $fun.postAjax("article/getArticle",{"fid":"0","fstate":"0","type":"2"},function(data){
                    var str = '';
                    for (var i = 0; i < data.detailsList.length; i++) {
                        str += '<dl>';
                        if(data.detailsList[i].img){
                            str += ' <dt><a href="/new/show.html?cate_id='+data.detailsList[i].articlecate_id+'&id='+data.detailsList[i].id+'"><img src="http://img.youzy.cn/uploadfiles/2015/10/16/16103245820774.jpg" class="img-responsive" alt=""/></a></dt>';  
                        };
                        str += '    <dd>';
                        str += '        <h4><a href="/new/show.html?cate_id='+data.detailsList[i].articlecate_id+'&id='+data.detailsList[i].id+'">'+data.detailsList[i].title+'</a></h4>';
                        str += '        <div class="zhaiyao">'+data.detailsList[i].summary+'</div>';
                        str += '        <div>时间：<span>'+data.detailsList[i].createTime+'</span> | 来源：<span>'+data.detailsList[i].source+'</span></div>';
                        str += '    </dd>';
                        str += '</dl>';                    
                    };
                    $("#new_list").html(str);
                }); 
                    $("#new_list_title").text("估分")                   
            }



        break;
        case "/new/show.html":
            //调用新闻分类, 列表名称
            new_list()
            var id = getUrl.id;
            $fun.ajax("article/getArticleContent",{"id":id});
        break;
        default :  
            //alert("style.js");
    }



    $fun.loadUrl("footer","/public/foot.html");

})


function new_list() {
    $fun.postAjax("article/getArticle",{"fid":"0","fstate":"0","type":"2"},function(data){
        for (var i = 0; i < data.articleList.length; i++) {
            var str = '<a href="/new/list.html?typeid='+data.articleList[i].id+'">'+data.articleList[i].name+'</a>'
            $("#new_type").append(str);
            if(window.location.pathname == "/new/list.html"){
                if(getUrl.typeid == data.articleList[i].id){
                    $("#new_list_title").text(data.articleList[i].name) 
                }                
            }
        };        
    });
}
