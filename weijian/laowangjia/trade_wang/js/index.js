$(function(){
    /*活动*/
    $("a").each(function(i,o){
        $(o).attr("href",$(o).attr("href")+"?Code=" + request("Code"))
    })
    function initJsonData() {
        if (JsonData.Activity.State == 1) {
            for (var i = 0; i < JsonData.Activity.Items.length; i++) {
                var item = JsonData.Activity.Items[i];
                switch (item.TemplateType) {
                    case 1001:
                    $("#go_prize").prop("href", "/activity/" + JsonData.ActivityId + "/" + item.TemplateType + "/?Code=" + request("Code") + "&PlanId=" + JsonData.ProductPlan.Id);
                    break;
                }
            }
        } else {

        }
    }
    $.getJSON("data.json", function (json) {
        window.JsonData = json;
        $.getJSON("../data.json", function (plan) {
            JsonData.ProductPlan = plan;
            if (JsonData.Activity)
                initJsonData();
        })
        $.getJSON("/activity/" + JsonData.ActivityId + "/data.json", function (activity) {
            JsonData.Activity = activity;
            if (JsonData.ProductPlan)
                initJsonData();
        })
    });
});
