$(function(){
    var $sub_menu_a = $("div.sub_menu ul li a");
    $sub_menu_a.click(function(){
        $("div.tab").hide();
        $sub_menu_a.removeClass("active");
        $("div.tab").eq($sub_menu_a.index(this)).show();
        $(this).addClass("active");
    })

    var code = request('Code');
    var linkUrl = "/service/antifake/";
    var linkApi = "http://apis.2wm.cn/Linked/";
    var total = 0;
    var companyId, ProductId;
    if(code == null){return;}
    $.getJSON(linkUrl + "?Act=CodeScanCount&code=" + code, function (htmlobj) {
        if (htmlobj.Success == true) {
            total = htmlobj.Data
            $("#lblTotal").text(total);
        }

        $.getJSON(linkUrl + "?Act=CodeScanByUser&code=" + code, function (htmlobj) {
            if (htmlobj.Success == true) {
                var hit = parseInt(htmlobj.Data);
                var Other = total - hit;
                $("#lblHit").text(hit);
                $("#lblOther").text(Other);
                if(total > 10){
                    $("div.sao_num h1").addClass("danger");
                    $("#danger").text("此标签被扫太多次了，如有疑问请联系厂家咨询。");
                }
            }
        })
    });

    $.getJSON(linkUrl + "?Act=CodeScanRecord&code=" + code, function (htmlobj) {
        if (htmlobj.Success == true) {
            $.each(htmlobj.Data, function (i, m) {
                if (i == 0) {
                    $("div.tab_two").append("<div style=\"margin-top: 0;\" class=\"fw_bor cord\">" +
                                        "<div class=\"ip\"><p>IP</p><h4>" + m.IP + "</h4></div>" +
                                        "<div class=\"area\"><h5>" + getArea(m.AreaId) + "</h5><p>" + m.CreateTime + "</p></div></div>" +
                                        "<div class=\"clear\"></div>")
                } else {
                    $("div.tab_two").append("<div class=\"fw_bor cord\">" +
                                            "<div class=\"ip\"><p>IP</p><h4>" + m.IP + "</h4></div>" +
                                            "<div class=\"area\"><h5>" + getArea(m.AreaId) + "</h5><p>" + m.CreateTime + "</p></div></div>" +
                                            "<div class=\"clear\"></div>")
                }
            })
        }
    })
    $.getJSON(linkApi + "/" + code, function (htmlobj) {
        companyId = htmlobj.CompanyId;
        ProductId = htmlobj.ProductId;
        $.getJSON(linkUrl + "?Act=GetProductInfo&companyId=" + companyId + "&ProductId=" + ProductId, function (htmlobj) {
            if (htmlobj.Success == true) {
                if (htmlobj.Data.Name != null)
                    $("#lblPName").text(htmlobj.Data.Name);
                if (htmlobj.Data.Name != null)
                    $("#lblProName").text(htmlobj.Data.Name);
            }
        })
    });
})
function fullPath(id) {
    var ret = [];
    var item = { P: id };
    while (true) {
        item = AreaData[item.P];
        if (item == null)
            break;
        ret.push({ id: item.I, name: item.N });

        if (item.P == 1)
            break;
    }
    return ret;
};
function getArea(id) {
    var path = fullPath(id);
    path.reverse();
    var ret = "";
    for (var idx in path) {
        ret += path[idx].name + " ";
    }

    ret = ret == "" ? "-" : ret;
    return ret;
};
