jQuery.extend(jQuery.validator.messages, {
    required: "必选字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期 (ISO).",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: jQuery.validator.format("请输入一个 长度最多是 {0} 的字符串"),
    minlength: jQuery.validator.format("请输入一个 长度最少是 {0} 的字符串"),
    rangelength: jQuery.validator.format("请输入 一个长度介于 {0} 和 {1} 之间的字符串"),
    range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: jQuery.validator.format("请输入一个最大为{0} 的值"),
    min: jQuery.validator.format("请输入一个最小为{0} 的值")
});

$(document).ready(function() {
    $("#jsForm").validate({
        submitHandler: function() {
            var url= $("#jsForm").attr("action"),
                formData = $fun.serializeJson($("#jsForm").serializeArray());
                switch (url){
                    case "login/index":
                        $fun.ajax(url,formData);
                        break;
                    case "guser/getInvitation":
                        console.log(formData);
                        $fun.ajax(url,formData);
                        break;
                    case "myscore/editMyScore":
                        $fun.ajax(url,formData);
                        break;
                    default :
                        self.location='/index.html';
                }

        },
        rules: {
            username: {
                required: true
            },
            password: {
                required: true,
                minlength: 6
            },
            score:{
                required: true
            }
//            confirm_password: {
//                required: true,
//                minlength: 5,
//                equalTo: "#password"
//            }
        },
        messages: {
            username: {
                required: "请输入账号"
            },
            password: {
                required: "请输入密码",
                minlength: jQuery.format("密码不能小于{0}个字符")
            },
            score:{
                required: "请输入分数"
            }
//            confirm_password: {
//                required: "请输入确认密码",
//                minlength: "确认密码不能小于5个字符",
//                equalTo: "两次输入密码不一致不一致"
//            }
        }
    });
});