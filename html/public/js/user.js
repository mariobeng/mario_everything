$(document).ready(function(){
    tel.VerificationSession();
    var user = jQuery.parseJSON($.session.get("user"));
    console.log(user);
    $fun.loadUrl("header","/public/header.html", function(){
        tel.login();
        $fun.nav();
    });
    //导入左导航
    $fun.loadUrl("user_left","/public/user_nav.html",function(){
        //$fun.Contour("user_left","user_right");//用户中心左右等高
        $("#user_left").find(".u_h_img>dt>img").attr({ src: user.icon, alt: user.name });
        $("#user_left").find(".u_h_img>dd>h3").text(user.name+',你好？');
    });
    $fun.loadUrl("footer","/public/foot.html");

    //我的关注  gz_tab
    $fun.tabs("gz_tab");
    
    //获取登录信息
    $("#jsForm").find("input[name='user_id']").val($.session.get('user_id'));
    //获取城市列表
    $fun.ajax("area/getAreadata",{"tree":"2"});

    switch (window.location.pathname){
        case "/user/Attention.html":
            $fun.ajax("mycollec/getMyCollectSchool",{"fid":"0","fstate":"0","user_id":user.user_id});
            $fun.ajax("mycollec/getMyCollectSpecialty",{"fid":"0","fstate":"0","user_id":user.user_id});
            break;
        case "/user/index.html":
            if(user){
                $("#jsForm").find(".headimg>img").attr({ src: user.icon, alt: user.name });

                $("#jsForm").find('input[name="sex"]').each(function(i){
                    if($(this).val()==user.sex){
                        $(this).prop({"checked":true});
                    }
                })
                $("#jsForm").find('input[name="kemu_type"]').each(function(i){
                    if($(this).val()==user.kemu_type){
                        $(this).prop({"checked":true});
                    }
                })
                $("#jsForm").find('input[name="name"]').val(user.name);
                $("#jsForm").find('input[name="email"]').val(user.email);
            }

            //$fun.ajax("guser/editMyInfo",{"year":"2015"},1);
            break;
        default :
            //alert("这是用户中心user弹出的问题")
    }

})