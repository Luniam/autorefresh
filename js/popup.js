document.addEventListener("DOMContentLoaded", function() {
    var checkBox = document.getElementById("checkbox1");
    var button = document.getElementById("setTime");
    var inpt = document.getElementById("timeHolder");
    var port = chrome.extension.connect({name: "Page Comm"});

    chrome.storage.sync.get("value", function(val) {
        if(val["value"]) {
            checkBox.checked = true;
        }

        else {
            checkBox.checked = false;
        }
    });

    chrome.storage.sync.get("timerValue", function(val) {
        if (val["timerValue"] > 0) {
            document.getElementById("timeStatus").innerHTML = "Currently set to " + val["timerValue"] + "s" ;
        }
    });

    checkBox.addEventListener("click", function() {
        chrome.storage.sync.set({"value" : checkbox1.checked}, function() {
            
        });
    });

    button.addEventListener("click", function() {
        var time = inpt.value;
        if (time >=1) {
            chrome.storage.sync.set({"timerValue" : time}, function() {
                document.getElementById("timeStatus").innerHTML = "Currently set to " + time + "s" ;
                inpt.value = "";
                port.postMessage(time);
            });
        }
        else {
            chrome.storage.sync.set({"timerValue" : 1}, function() {
                document.getElementById("timeStatus").innerHTML = "Currently set to 1s";
                inpt.value = "";
                port.postMessage(1);
            });
        }
    });
});