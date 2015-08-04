$(function(){
    $("a").each(function(i,o){
        $(o).attr("href",$(o).attr("href")+"?Code=" + request("Code"))
    })
})
