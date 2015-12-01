
var tel = {
    _success: function (data, setUrl ,type) {
        switch (setUrl) {
            case "login/index"                                  : this.session(data);                   break;       //登录
            case "area/getAreadata"                             : this.city(data);                      break;       //切换城市
            case "myscore/editMyScore"                          : this.editMyScore(data,type);               break;       //我的成绩003
            case "school/getSchoolRankingList"                  : this.getSchoolRankingList(data);      break;       //院校排行榜
            case "specialist/getSpeciaList"                     : this.getSpeciaList(data);             break;       //咨询问答008
            case "article/getArticle"                           : this.getArticle(data,type);                break;       //倒计时015 指南009
            case "school/getScoredSchoolList"                   : this.getScoredSchoolList(data);       break;       //知分选院校013
            case "specialtyabout/getSpecialtyList"              : this.getSpecialtyList(data);          break;       //按专业查012
            case "mysimulateregister/getMySimulateRegister"     : this.getMySimulateRegister(data,type);     break;       //生成志愿表027
            case "province_scores/getProvinceScoreList"         : this.getProvinceScoreList(data);      break;       //各省分数线查询017
            case "questions/getNatureTestQuestions"             : this.getNatureTestQuestions(data);    break;       //获取测试题目
            case "nature/postNatureTestAnswer"                  : this.postNatureTestAnswer(data);      break;       //测试性格推专业050
            case "specialtyscores/getSchoolEstimateScores"      : this.getSchoolEstimateScores(data);   break;       //选院校估考分052
            case "school/getSchoolTableList"                    : this.getSchoolTableList(data,type);        break;       //真假大学016 //开设院校032
            case "zhaosheng/getZhaoSheng"                       : this.getZhaoSheng(data,type);              break;       //招生计划查询020 //招生计划034
            case "specialtyscores/getSchoolScores"              : this.getSchoolScores(data,type);      break;       //院校分数线查询查询018 //院校历年分数线037
            case "specialtyscores/getSpecialtyscores"           : this.getSpecialtyscores(data);        break;       //专业分数线查询019
            case "specialtyabout/getSpecialtyAbout"             : this.getSpecialtyAbout(data);         break;       //专业详细028
            case "school/getSchoolOtherInfoList"                : this.getSchoolOtherInfoList(data,type);    break;       //院校简介033
            case "school/getSchoolOtherInfo"                    : this.getSchoolOtherInfo(data,type);    break;       //院校简介033
            case "school/getSchooltable"                        : this.getSchooltable(data,type);    break;       //院校简介033

            case "school/getSpecialtySelectList"                : this.getSpecialtySelectList(data);    break;       //专业信息035
            case "pricerule/getPriceRule"                       : this.getPriceRule(data);              break;       //充值
            case "bill/getBill"                                 : this.getBill(data);                   break;       //查询账单055
            case "integrationrule/getIntegrationRule"           : this.getIntegrationRule(data);        break;       //积分规则
            case "mycollec/getMyCollectSchool"                  : this.getMyCollectSchool(data);        break;       //我关注的院校022
            case "mycollec/getMyCollectSpecialty"               : this.getMyCollectSpecialty(data);     break;       //我关注的专业022
            case "friend/getFriend"                             : this.getFriend(data);                 break;       //我邀请的好友023
            case "guser/editMyInfo"                             : this.editMyInfo(data,type);                break;       //个人信息编辑及查看页面039
            case "myscore/getSameScoreStu"                      : this.getSameScoreStu(data);           break;       //我的同分同学040
            case "mysimulateregister/getMySimulateRegisterList" : this.getMySimulateRegisterList(data); break;       //我的志愿表029
            case "article/getArticleList"                       : this.getArticleList(data);         break;       //资讯详情043
            case "article/getArticleContent"                    : this.getArticleContent(data);         break;       //资讯详情043
            case "suggestion/postSuggestion"                    : this.postSuggestion(data);            break;       //意见反馈60
            case "guser/forgotPassword"                         : this.forgotPassword(data);            break;       //找回密码
            case "smregister/getSimulateRegister"               : this.getSimulateRegister(data);            break;       //模拟填报024
            default :  alert(123333);
        }
    },

    VerificationSession:function(){
        if ($.session.get('ret')!=null) {
            //alert("登录成功")
        }else{
            window.history.back(-1);
           // alert("请登录")
        }
    },

    //用户登录
    login: function (data){
        //this.session(data);
        if ($.session.get('ret')==0 && $.session.get('code')==0) {
            $("#nav_s").hide();
            $("#nav_end").show();
            $("#nav_end>span").text(jQuery.parseJSON($.session.get('user')).username)
        } else {
            $("#nav_s").show();
            $("#nav_end").hide();
        }
        $("#logout").click(function () {
            $.session.clear();
            $("#nav_s").show();
            $("#nav_end").hide();
        })
    },
    //写入session
    session: function (data) {
        if(data.ret==0 && data.code==0){
            $.session.set('ret', data.ret);
            $.session.set('code', data.code);
            $.session.set('user_id', data.user_id);
            $.session.set('user', JSON.stringify(data));
            window.history.back(-1);
        }else{
            if(data.errcode == "0001"){
                if($("#jsForm").find("input[name='password']").next().is("label")){
                    $("#jsForm").find("input[name='password']").next().show().text(data.msg);
                }else{
                    $("#jsForm").find("input[name='password']").after('<label for="password" class="error" >'+data.msg+'</label>')
                }

            }else if(data.errcode == "0007"){
                if($("#jsForm").find("input[name='username']").next().is("label")){
                    $("#jsForm").find("input[name='username']").next().show().text(data.msg);
                }else{
                    $("#jsForm").find("input[name='username']").after('<label for="password" class="error" >'+data.msg+'</label>')
                }
            }
        }
    },
    //切换城市
    city:function(data){
        for(var i=0; i<data.body.length; i++){
            var str = '<option value="'+data.body[i].id+'">'+data.body[i].name+'</option>';
            $("#gx_areadata_id").append(str);
        }
    },
    //我的分数
    editMyScore: function (data,type) {
        if(type){
           switch(type){
            case 1 :
                    console.log("我的成绩003");
                    console.log(data);
                break;            
            case 2 :
                    console.log("选择用户类型004");
                    console.log(data);
                break;
            default:
                alert(123)
            } 
        }else{
            alert("我的成绩003我的成绩003我的成绩003我的成绩003我的成绩003我的成绩003")
        }
    },
    //院校排行榜
    getSchoolRankingList: function(data){
        console.log("院校排行榜");
        console.log(data);
    },
    //咨询问答
    getSpeciaList: function(data){
        console.log("咨询问答");
        console.log(data);
    },
    //倒计时015
    getArticle:function(data,type){
        if(type){
           switch(type){
            case 1 :
                    console.log("倒计时015");
                    console.log(data);
                break;            
            case 2 :
                    console.log("指南");
                    console.log(data);
                break;
            default:
                alert(123)
            } 
        }else{
            alert("倒计时015倒计时015倒计时015倒计时015")
        }
    },
    //知分选院校
    getScoredSchoolList:function(data){
        console.log("知分选院校");
        console.log(data);
    },
    //按专业查012
    getSpecialtyList:function(data){
        console.log("按专业查012");
        console.log(data);
    },
    //生成志愿表027
    getMySimulateRegister:function(data,type){
        if(type){
           switch(type){
            case 1 :
                    console.log("生成志愿表027");
                    console.log(data);
                break;            
            case 2 :
                    console.log("我的防撞车");
                    console.log(data);
                break;
            default:
                alert(123)
            } 
        }else{
            alert("生成志愿表027生成志愿表027生成志愿表027生成志愿表027")
        }
    },
    //各省分数线查询017
    getProvinceScoreList:function(data){
        console.log("各省分数线查询017");
        console.log(data);
    },
    //获取测试题目
    getNatureTestQuestions:function(data){
        console.log("获取测试题目");
        console.log(data);
        var str = '';
        for (var i = 0; i < data.body.length; i++) {       
            str += '<li data-id="'+data.body[i].id+'">';
            str += '    <div class="xg_title">'+data.body[i].questions+'</div>';
            str += '    <div class="dati">';
            str += '        <label>';
            str += '            <input type="radio" name="questions_'+data.body[i].id+'" id="yes_'+data.body[i].id+'" value="1">';
            str += '            <button type="button" class="btn btn-success">是</button>';
            str += '        </label>';
            str += '        <label>';
            str += '            <input type="radio" name="questions_'+data.body[i].id+'" id="no_'+data.body[i].id+'" value="0">';
            str += '            <button type="button" class="btn btn-danger">否</button>';
            str += '        </label>';
            str += '    </div>';
            str += '</li>';
        };
        $("#wenti_list").html(str);

        //开始答题
        var count = $("#wenti_list li").length;
        $("#wenti_list li").first().show();
        $("#wenti_list li").each(function(i){
            var _this = $(this);
            $(this).find("button").click(function(){
                _this.hide().next().show();
                if(count == i+1){
                    $("#modal_box").find(".close_modal").click();
                    alert("算结果")
                }
            })
        })
    },   
    //测试性格推专业050
    postNatureTestAnswer:function(data){
        //console.log("测试性格推专业050");
        console.log(data);
    },  
    //选院校估考分052
    getSchoolEstimateScores:function(data){
        console.log("选院校估考分052");
        console.log(data);
    },
    //真假大学016
    //开设院校032
    getSchoolTableList:function(data,type){
        if(type){
           switch(type){
            case 1 :
                    console.log("真假大学016");
                    console.log(data);
                break;            
            case 2 :
                    console.log("开设院校032");
                    console.log(data);
                break;
            default:
                alert(122223)
            } 
        }else{
            alert(11111111)
        }
    },  
    //院校分数线查询查询018 //院校历年分数线037
    getSchoolScores:function(data,type){
        if(type){
           switch(type){
            case 1 :
                    console.log("院校分数线查询查询018");
                    console.log(data);
                break;            
            case 2 :
                    console.log("院校历年分数线037----已使用");
                    //console.log(data);
                    for(var i=0; i< 5; i++){
                        var str ='<tr>';
                            str+='    <td>'+data.body[i].year+'年</td>';
                            str+='    <td>'+data.body[i].scoreAvg+'</td>';
                            str+='    <td>'+data.body[i].scoreHigh+'</td>';
                            str+='    <td>'+data.body[i].scoreLow+'</td>';
                            str+='    <td>'+data.body[i].wenLi+'</td>';
                            str+='    <td>'+data.body[i].piCi+'</td>';
                            str+='</tr>';
                        $("#lnfsx").find('tbody').prepend(str);
                    }

                break;
            default:
                alert(123)
            } 
        }else{
            alert(11111111)
        }
    },  
    //专业分数线查询019
    getSpecialtyscores:function(data){
        console.log("专业分数线查询019");
        console.log(data);
            //{"id":425,"name":"北京大学","year":2013,"specialtyType":"法学","province":"四川","piCi":"二批","wenLi":2,"provinceId":24,"scoreLow":0.0,"schoolId":740,"scoreAvg":561.0,"scoreHigh":565.0}
            for(var i=0; i< 5; i++){
                var str ='<tr>';
                    str+='    <td>'+data.body[i].specialtyType+'</td>';
                    str+='    <td>'+data.body[i].year+'</td>';
                    str+='    <td>'+data.body[i].province+'</td>';
                    str+='    <td>'+data.body[i].piCi+'</td>';
                    str+='    <td>'+data.body[i].scoreAvg+'</td>';
                    str+='    <td>'+data.body[i].scoreHigh+'</td>';
                    str+='    <td>'+data.body[i].scoreLow+'</td>';
                    str+='</tr>';
                $("#zyfsxcx").find('tbody').prepend(str);
            }
    },
    //专业详细028
    getSpecialtyAbout:function(data){
        console.log("专业详细028");
        console.log(data);
    },    
    //院校简介033
    getSchooltable: function (data,type) {
        if(type){
           switch(type){
            case 1 : //网站首页
                var str  = '<div class="school_name">';
                    str += '    <h1>'+data.body.name+'</h1>';
                    str += '    <div class="daima">';
                    str += '        <div id="school_tal" class="biaoshi"></div>';
                    str += '        <div>校园代码：<span>------</span></div>';
                    str += '    </div>';
                    str += '</div>';
                    str += '<div  class="school_xueke">';
                    str += '<span class="bg1">类型：---</span>';
                    str += '<span class="bg2">隶属于：---</span>';
                    str += '<span class="bg3">国家重点学科：---</span>';
                    str += '<span class="bg4">院士：---</span>';
                    str += '<span class="bg5">博士点：---</span>';
                    str += '<span class="bg6">硕士点：----</span>';
                    str += '</div>';
                $("#xuexiaobiaoti").html(str);
                if(data.body.tag){
                    var tab = jQuery.parseJSON(data.body.tag);
                    console.log(tab)
                    for(var k=0; k<tab.length; k++){
                        if(tab[k].Name == "211"){
                            $("#school_tal").append('<span class="label label-success">211</span>')
                        }
                        if(tab[k].Name == "985"){
                            $("#school_tal").append('<span class="label label-info">985</span>')
                        }
                        if(tab[k].Name == "研"){
                            $("#school_tal").append('<span class="label label-warning">研</span>')
                        }
                        if(tab[k].Name == "国"){
                            $("#school_tal").append('<span class="label label-success">国</span>')
                        }
                    }  
                }
                //首页学院简介
                $("#school_index_about").html(data.body.about);
                //学院简介
                if(getUrl.about){
                    $("#school_content").html(data.body.about);
                }
                break;            
            case 2 : //微信首页
                //顶部
                $("#solid").append('<img src="http://gkbk67.com/shool_logo/'+getUrl.schoolId+'/cover.jpg" alt="'+data.body.name+'" title="'+data.body.name+'">') 
                $("#wx_head").find('.wx_name').text(data.body.name);
                break;
            default:
                alert(11111)
            } 
        }
    },
    getSchoolOtherInfoList:function(data,type){
        //学校导航
        if(type){
            switch(type){
            case 1 : //网站首页
                var str;
                str  = '<div class="container">';
                str += '<ul class="nav s_nav">';
                str += '<li class="active"><a href="/school/school_index.html?schoolId='+getUrl.schoolId+'">院校首页</a></li>';
                str += '<li><a>高校概况</a>';
                str += '<ul class="list-unstyled">';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&about=1">院校简介</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[0].id+'">'+data.body[0].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[1].id+'">'+data.body[1].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[2].id+'">'+data.body[2].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[3].id+'">'+data.body[3].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[4].id+'">'+data.body[4].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[5].id+'">'+data.body[5].title+'</a></li>';
                str += '</ul>';
                str += '</li>';
                str += '<li><a>报考指南</a>';
                str += '<ul class="list-unstyled">';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[10].id+'">'+data.body[10].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[11].id+'">'+data.body[11].title+'</a></li>';
                str += '</ul>';
                str += '</li>';
                str += '<li><a href="/school/school_about.html">专业信息</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[13].id+'">'+data.body[13].title+'</a></li>';
                str += '<li><a href="/school/school_about.html">历年分数线</a></li>';
                str += '<li><a>招生信息</a>';
                str += '<ul class="list-unstyled">';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[6].id+'">'+data.body[6].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[7].id+'">'+data.body[7].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[8].id+'">'+data.body[8].title+'</a></li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[9].id+'">'+data.body[9].title+'</a></li>';
                str += '</ul>';
                str += '</li>';
                str += '<li><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[12].id+'">'+data.body[12].title+'</a></li>';
                str += '<li><a href="/school/school_list.html">联系方式</a></li>';
                str += '</ul>';
                str += '</div>';
                $("#school_nav").append(str);
                for(var i=0; i<data.body.length; i++){
                    if(data.body[i].id == getUrl.id ){
                        var breadcrumb ='<dt>你当前所在的位置：</dt>';
                            breadcrumb+='<dd><a href="#">首页</a></dd>';
                            breadcrumb+='<dd><a href="/school/school_about.html?schoolId='+getUrl.schoolId+'&id='+data.body[i].id+'">'+data.body[i].title+'</a></dd>';
                        $("#breadcrumb").html(breadcrumb);
                        $("#school_content_title").html(data.body[i].title);
                        return;
                    }
                }
                break;            
            case 2 : //微信首页

                break;
            default:
                console.log('getSchoolOtherInfoList');
            } 
        }

    },
    getSchoolOtherInfo:function(data,type){
        //console.log(data);
        if(type){
           switch(type){
            case 1 :
                if(getUrl.id){
                    $("#school_content").html(data.body.content);
                }
                break;            
            case 2 :

                break;
            default:
                console.log('getSchoolOtherInfo');
            } 
        }else{
            console.log('getSchoolOtherInfo');
        }
    },
    //专业信息035
    getSpecialtySelectList:function(data){
        console.log("专业信息035");
        console.log(data);
    },    
    //招生计划034 招生计划查询020
    getZhaoSheng:function(data,type){
        if(type){
           switch(type){
            case 1 :
                    console.log("招生计划查询020");
                    console.log(data);
                break;            
            case 2 :
                    console.log("招生计划034");
                    console.log(data);
                    for(var i=0; i< data.body.length; i++){
                        var str ='<tr>';
                            str+='    <td>'+data.body[i].id+'</td>';
                            str+='    <td>'+data.body[i].keLei+'</td>';
                            str+='    <td>'+data.body[i].level+'</td>';
                            str+='    <td>'+data.body[i].planNumber+'</td>';
                            str+='    <td>'+data.body[i].province+'</td>';
                            str+='    <td>'+data.body[i].provinceId+'</td>';
                            str+='    <td>'+data.body[i].state+'</td>';
                            str+='    <td>'+data.body[i].type+'</td>';
                            str+='    <td>'+data.body[i].xueZhi+'</td>';
                            str+='    <td>'+data.body[i].year+'</td>';
                            str+='    <td>'+data.body[i].zhuanYe+'</td>';
                            str+='</tr>';
                        $("#zhaoshengjihua").find('tbody').prepend(str);
                    }
                break;
            default:
                console.log("getZhaoSheng")
            } 
        }else{
            console.log("getZhaoSheng")
        }
    }, 
    //充值056  
    getPriceRule:function(data){
        console.log("充值056");
        console.log(data);
    }, 
    //查询账单055
    getBill:function(data){
        console.log("查询账单055");
        console.log(data);  
    }, 
    //积分规则054
    getIntegrationRule:function(data){
        console.log("积分规则054");
        console.log(data);  
    }, 
    //我关注的院校02
    getMyCollectSchool:function(data){
        for(var i=0; i< data.body.length; i++){
            var str  = '<dl>';
                str += '<dt><a href="/school/school_index.html?schoolId='+data.body[i].id+'"><img src="http://img.youzy.cn/uploadfiles/2015/10/16/16103245820774.jpg" class="img-responsive" alt=""></a></dt>';
                str += '<dd>';
                str += '<h4><a href="/school/school_index.html?schoolId='+data.body[i].id+'">'+data.body[i].name+'</a> <small>录取概率：63%</small></h4>';
                str += '<table>';
                str += '<tbody><tr>';
                str += '<td>2014年</td>';
                str += '<td>最高分：--</td>';
                str += '<td>平均分：588</td>';
                str += '<td>省控线：503</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>2013年</td>';
                str += '<td>最高分：601</td>';
                str += '<td>平均分：588</td>';
                str += '<td>省控线：503</td>';
                str += '</tr>';
                str += '<tr>';
                str += '<td>2012年</td>';
                str += '<td>最高分：604</td>';
                str += '<td>平均分：588</td>';
                str += '<td>省控线：503</td>';
                str += '</tr>';
                str += '</tbody>';
                str += '</table>';
                str += '<div class="gz_box">';
                str += '<a href="#" class="ok">取消关注</a>';
                str += '</div>';
                str += '</dd>';
                str += '</dl>';
            $("#myyuanxiao").prepend(str);
        }





    }, 
    //我关注的专业
    getMyCollectSpecialty:function(data){
        console.log("我关注的专业");
        console.log(data);
        for(var i=0; i< data.body.length; i++){
            var str  = '<dl>';
            str += '<dd>';
            str += '<h4><a href="/school/school_index.html?id='+data.body[i].id+'">'+data.body[i].name+'</a> <small>录取概率：63%</small></h4>';
            str += '<div class="gz_box">';
            str += '<a href="#" class="ok">取消关注</a>';
            str += '</div>';
            str += '</dd>';
            str += '</dl>';
            $("#myzhuanzhu").prepend(str);
        }
    }, 
    //我邀请的好友023
    getFriend:function(data){
        console.log("我邀请的好友023");
        console.log(data);  
    }, 
    //个人信息编辑及查看页面039
    editMyInfo:function(data,type){
        if(type){
           switch(type){
            case 1 :
                    console.log("个人信息编辑及查看页面039");
                    console.log(data);
                break;            
            case 2 :
                    console.log("修改密码");
                    console.log(data);
                break;
            default:
                console.log("个人信息编辑及查看页面039")
            } 
        }else{
            console.log("个人信息编辑及查看页面039")
        }
    }, 
    //我的同分同学040
    getSameScoreStu:function(data){
        console.log("我的同分同学040");
        console.log(data);  
    }, 
    //资讯列表页
    getArticleList:function(data){
        console.log("资讯列表页");
        console.log(data);  
    },
    //资讯详情043
    getArticleContent:function(data){
        if(data.ret==0){
            //渲染新闻详情页
            $("#news_content").find('h1').html(data.title)
            $("#news_content").find('.fbsj').html(data.new_time)
            $("#news_content").find('.new_content').html(data.content)
        }else{
            alert("详情页不存在")
        }

    }, 
    //意见反馈60
    postSuggestion:function(data){
        console.log("意见反馈60");
        console.log(data);  
    }, 

    //找回密码
    forgotPassword:function(data){
        console.log("找回密码");
        console.log(data);  
    },

    //模拟填报024
    getSimulateRegister:function(data){
        console.log("模拟填报024");
        console.log(data);  
    }
};
