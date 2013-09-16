document.write("<h2>Hello</h2>");
var bg = chrome.extension.getBackgroundPage();
document.documentElement.innerHTML = bg.extracted_html;
console.log(bg.extracted_html);