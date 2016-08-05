var defaultRefresh = 5000;
var timer = 5;
var timeout;

changeTime();

function changeTime() {
    chrome.storage.sync.get("timerValue", function(val) {
        if(val["timerValue"] == null) {
            timeout = setInterval(start,defaultRefresh);
        }

        else {
            timer = val["timerValue"];
            defaultRefresh = timer * 1000;
            timeout = setInterval(start,defaultRefresh);
        }
    });
}

chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg != timer) {
            timer = msg;
            defaultRefresh = timer * 1000;
            clearTimeout(timeout);
            timeout = setInterval(start,defaultRefresh);
        }
    });
});


function start() {
    chrome.storage.sync.get("value", function(val) {
        if (val["value"]) {
            chrome.tabs.reload();
        }
    });
} 