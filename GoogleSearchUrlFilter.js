(function () {
    chrome.extension.sendMessage({cmd:"flagFilterGoogleSearchUrl"}, function(response){
        var b = response;
        console.log("filterGoogleSearchUrl:", b);
        if (!b) return;
        setTimeout(filterGoogleSearchUrl, 3000);
    })

    function filterGoogleSearchUrl() {
        var a = $("#ires #rso div h3 a");
//        a.after('<a style="display:block;float:right;" target="_blank" href="' + a.attr('href') + '"><button style="cursor:pointer;">OPEN</button></a>');
        a.each(function(){
            var j = $(this);
            var newBlock = $('<a style="display:block;float:left;" target="_blank" href="' + j.attr('href') + '"></a>');
            newBlock.append(j.html());
            newBlock.append('<em>「✓」</em>');
            j.after(newBlock);
            j.hide();
        });
        console.log("Google Search Url filtered:" + a.length);
    }
    // still jump to google's url after click
    function filterGoogleSearchUrl_old() {
        var a = $("#ires h3 a");
        a.attr("onmousedown", null);
        a.attr("target", "_blank");
        console.log("Google Search Url filtered:" + a.length);
        a = $("#ires .fc a");
        a.attr("onmousedown", null);
        a.attr("target", "_blank");
        console.log("Google Search Url filtered:" + a.length);
    }
    console.log("Google Search Url Filter loaded.");
})();
