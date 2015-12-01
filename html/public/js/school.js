$(document).ready(function(){
//    //设置或获取对象指定的文件名或路径。
    //alert(window.location.pathname)
//    //设置或获取整个 URL 为字符串。
//    alert(window.location.href);
//    //设置或获取与 URL 关联的端口号码。
//    alert(window.location.port)
//    //设置或获取 URL 的协议部分。
//    alert(window.location.protocol)
//    //设置或获取 href 属性中在井号“#”后面的分段
//    alert(window.location.hash)
//    //设置或获取 location 或 URL 的 hostname 和 port 号码。
//    alert(window.location.host)
//    //设置或获取 href 属性中跟在问号后面的部分。
    if(getUrl.schoolId){
        $fun.ajax("school/getSchooltable",{"id":getUrl.schoolId},1);
        $fun.ajax("school/getSchoolOtherInfoList",{"schoolId":getUrl.schoolId},1);
    }
    if(getUrl.id){
        $fun.ajax("school/getSchoolOtherInfo",{"articleId":getUrl.id});
    }

    
 	switch (window.location.pathname) {
        case "/school/school_index.html":
        	//院校分数线
        	$fun.ajax("specialtyscores/getSchoolScores",{"Name":"北京大学","fid":"0","fstate":"0","kemuType":"1","provinceId":"2"},2);
        	//专业分数线
        	//$fun.ajax("specialtyscores/getSpecialtyscores",{"ProvinceId":"2","WenLi":"1","Year":"2011","fid":"0","fstate":"0","name":"北京大学"});
        	//招生计划
        	$fun.ajax("zhaosheng/getZhaoSheng",{"KeLei":"理工","ProvinceId":"2","Year":"2015","fid":"0","fstate":"0","name":"北京大学"},2);
        break;
        default :  
        	alert("school.js");
    }

});

