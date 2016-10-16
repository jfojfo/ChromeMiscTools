var bg = chrome.extension.getBackgroundPage();
var tabsStore = bg.tabsStore || {};
bg.tabsStore = tabsStore;
chrome.tabs.onCreated.addListener(function(tab) {
    tabsStore[tab.id] = {
        "isExtractorScriptInjected":false
    };
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    tabsStore[tabId] = {
        "isExtractorScriptInjected":false
    };
    console.log(tabsStore);
});
chrome.tabs.onRemoved.addListener(function(tabId) {
    delete tabsStore[tabId];
    console.log(tabsStore);
});

chrome.extension.onMessage.addListener(
    function(msg, sender, sendResponse){
        console.log(sender.tab ?
            "from a content script:" + sender.tab.url :
            "from the extension");
        console.log(msg);
        var cmd = msg.cmd;
        console.log("cmd:", cmd);
        if (cmd == "flagFilterGoogleSearchUrl") {
            var flag = bg.filterGoogleSearchUrl;
            if (flag == undefined)
                flag = true;
            sendResponse(flag);
        } else {
            sendResponse("Unknown");
        }
    }
);
