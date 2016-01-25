var prizeLevel = ["特","一","二","三","四","五","六","七","八","九","十"];
var prizeList =[
    "200元购机劵   ",
    "100元购机劵   ",
    "50元购机劵     ",
    "50元话费     ",
    "30元话费     ",
    "10元话费     ",
    "5元话费     ",
    "1元话费     ",
    "500MB流量     ",
    "300MB流量     ",
    "100MB流量     ",
    "50MB流量     "
]
var info = [];
for (var a in prizeList) {
    info.push( prizeList[a]);
    $("#prizeList ul:first").append("<li><strong> "+ prizeLevel[a] +"等奖：</strong> "+prizeList[a]+"</li>")
}
function resize(){
    if($(window).height()/$(window).width()>1.575){
        $("#main").height($(window).width()*1.575);
    }

    $("#rotate_box").height($("#rotate_box").width());
    $("#rotate").attr("height",$("#rotate_box").height())
    $("#rotate").attr("width",$("#rotate_box").height())


    var step = 2 * Math.PI / info.length;
    var outerR = $("#rotate").width()/2; //轮盘的大小
    var interR = 50;//内存空白圆的大小
    var beginAngle=50;//旋转起来时默认开始旋转的度数，度数愈大旋转的初始速度愈大
    var radio = 0.95;//旋转速度衰减系数，影响旋转时间
    var t = null;
    var canvas = document.getElementById("rotate");
    var context = canvas.getContext("2d");
    context.translate(outerR,outerR);
    init(context);

    function init(context){
           for (var i = 0; i < info.length; i++) {
                 context.save();
                 context.beginPath();
                 context.globalAlpha = 1;
                 context.moveTo(0,0);
                 context.fillStyle= i%2 == 0 ? "#faca00":"#fbdb00";
                 context.arc(0,0,outerR,i*step,(i+1)*step);
                 context.fill();

                 context.beginPath();
                 context.fillStyle="#ba2d10";
                 context.font="12px 微软雅黑";
                 context.textAlign="center";
                 context.textBaseline="middle";
                 context.shadowColor = "#fff5ae";
                 context.shadowBlur=1;
                 context.shadowOffsetX=-1;
                 context.shadowOffsetY=1;
                 context.rotate(i*step+step/2);
                 context.fillText(info[i],(outerR + interR)/2,0);
                 context.restore();
          }
        context.save();

    }
}
resize();
$(window).resize(resize);

var $plateBtn = $('#plateBtn');
var $result = $('#result');
var $resultTxt = $('#resultTxt');
var $resultBtn = $('#resultBtn');

var rotateFunc = function(angle,text){
    $plateBtn.stopRotate();
    $plateBtn.rotate({
        angle: 0,
        duration: 5000,
        animateTo: angle + 1440,
        callback: function(){
            $("#prizeinfo").html(text);
            var userInfo = $("div.user_info");
            if(userInfo.length > 0){
                userInfo.show();

            }else{

            }
        }
    });
};

$resultBtn.click(function(){
    $result.hide();
});
var getTelPhone = function(){
        window.TelPhone = prompt("请输入手机号码");
        if(!/^1\d{10}$/.test(window.TelPhone )){
            getTelPhone();
        }else{
           $.get("", { "Act":"SubmitPhone", "Phone": window.TelPhone }, function (data) {
              var d = (new Function("return " + data))()
              var vstring = "您已经提交过了电话号码";
              if (d.Success || (d.Data.length > vstring.length && d.Data.substring(0,vstring.length) == vstring)) {
                  $("#TelPhone").val(window.TelPhone);
              } else {
                  alert(d.Data);
              }
          });
        }
}

/*$("#first").click(function(){
    $("#first").hide();
    $("#main").css("visibility","inherit");
     getTelPhone();
})*/

$("div.user_info button").click(function(){
    $.get("", { "Act":"SubmitAddress", "Name":$("#Name").val(),"TelPhone":$("#TelPhone").val(),"Address":$("#Address").val(),"ZipCode":$("#ZipCode").val() }, function (data) {
                var d = (new Function("return " + data))()
                if (d.Success) {
                    alert("我们已记录了您的收件地址奖品请注意查收!")
                } else {
                    alert(d.Data);
                }
        });
})
