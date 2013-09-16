var bg = chrome.extension.getBackgroundPage();
var tabsStore = bg.tabsStore || {};
bg.tabsStore = tabsStore;

function getCurrTabProp(tabId, prop, defValue) {
    var store = tabsStore[tabId];
    if (!store)
        return defValue;
    return store[prop];
}

function setCurrTabProp(tabId, prop, value) {
    var store = tabsStore[tabId];
    if (!store) {
        store = {};
        tabsStore[tabId] = store;
    }
    store[prop] = value;
}

function onExtract() {
    $("#extract").button("loading");
    var tag = $("#tag").val();
    console.log("tag is: ", tag);
    chrome.tabs.query({currentWindow: true, active : true},
        function(tabArray){
            var tab = tabArray[0];
            var prop = "isExtractorScriptInjected";
            if (!getCurrTabProp(tab.id, prop, false)) {
                chrome.tabs.executeScript(null, {file: "jquery-1.7.1.min.js"});
                chrome.tabs.executeScript(null, {file: "extractor.js"});
                setCurrTabProp(tab.id, prop, true);
            }
            console.log("====>",tabsStore);
            chrome.tabs.sendMessage(tab.id, {tag:tag}, function(response) {
                var htmlCode = response;
                //var url = "data:text/html;charset=utf-8," + encodeURIComponent(htmlCode);
                chrome.extension.getBackgroundPage().extracted_html = htmlCode;
                var url = chrome.extension.getURL("preview.html");
                chrome.tabs.create({url: url});
                //window.close();
            });
        }
    );
}
function onShowAds(show) {
    chrome.tabs.query({currentWindow: true, active : true},
        function(tabArray){
            var tab = tabArray[0];
            var prop = "isFilterAdsScriptInjected";
            if (!getCurrTabProp(tab.id, prop, false)) {
                chrome.tabs.executeScript(null, {file: "jquery-1.7.1.min.js"});
                setCurrTabProp(tab.id, prop, true);
            }
            chrome.tabs.executeScript(null, {code: show ? '$("iframe").show()' : '$("iframe").hide()'});
        }
    );
}
function onToggleFilterGoogleSearchUrl() {
    console.log("orig bg.filterGoogleSearchUrl:", bg.filterGoogleSearchUrl);
    if (bg.filterGoogleSearchUrl) {
        bg.filterGoogleSearchUrl = false;
        $(this).attr('checked', false);
        return;
    } else {
        bg.filterGoogleSearchUrl = true;
        $(this).attr('checked', true);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOMContentLoaded");
    $("#tag").focus();
    $("#extract").click(onExtract);
    $("#tag").bind("keyup", function(e){
        if (e.keyCode == 13) {
            onExtract();
        }
    });
    $("#show_ads").click(function(){onShowAds(true);});
    $("#hide_ads").click(function(){onShowAds(false);});
    $("#filterGoogleSearchUrl").click(onToggleFilterGoogleSearchUrl);
    $("#filterGoogleSearchUrl").attr('checked', bg.filterGoogleSearchUrl);
});
