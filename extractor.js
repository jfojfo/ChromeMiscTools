console.log("extractor script loaded");

chrome.extension.onMessage.addListener(
    function(message, sender, sendResponse) {
        var tag = message.tag;
        console.log($(tag));
//        var html = $("<div>").append($(tag).clone()).html();
        var html = $(tag).get(0).outerHTML;
        console.log("====html:", html);
        var baseurl = window.location.protocol + "//" + window.location.host;
        var basetag = $("base");
        if (basetag.length > 0) {
            baseurl = basetag.attr("href") + "/";
        }
        console.log("====baseurl:", baseurl);
        var meta = $('meta[http-equiv="content-type"]');
        if (meta.length > 0) {
            meta = meta.get(0).outerHTML;
        } else {
            meta = '<meta http-equiv="content-type" content="text/html;charset=utf-8">';
        }
        console.log(meta);
        html = '<html><head><base href="' + baseurl
            + '"/>' + meta + '</head><body>'
            + html + '</body></html>';
        sendResponse(html);
        return true;
    }
);

//@sourceURL=extractor.js
