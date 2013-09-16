(function () {
    chrome.extension.sendMessage({cmd:"flagFilterGoogleSearchUrl"}, function(response){
        var b = response;
        console.log("filterGoogleSearchUrl:", b);
        if (!b) return;
        filterGoogleSearchUrl();
    })

    function filterGoogleSearchUrl() {
        var a = $("#ires h3 a");
        a.attr("onmousedown", null);
        a = $("#ires .fc a");
        a.attr("onmousedown", null);
        console.log("Google Search Url filtered");
    }
})();