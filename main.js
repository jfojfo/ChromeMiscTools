//var r = document.createElement("script");
//r.type = "text/javascript";
//r.src = chrome.extension.getURL("jquery-1.7.1.min.js");
//document.body.appendChild(r);

var r = document.createElement("script");
r.type = "text/javascript";
r.src = chrome.extension.getURL("BlobBuilder.min.js");
document.body.appendChild(r);

var r = document.createElement("script");
r.type = "text/javascript";
r.src = chrome.extension.getURL("FileSaver.min.js");
document.body.appendChild(r);

r = document.createElement("script");
r.type = "text/javascript";
r.src = chrome.extension.getURL("script.js");
document.body.appendChild(r);

