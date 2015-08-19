(function() {

var debugHtml = '<div id="debug-log" style="position: fixed; top: 0; left: 0; width: 100%; z-index: 10000; color: white; background: black;"></div>';
$(document.body).append($(debugHtml));

var logElement;
var prevTime = 0;
function debugLog(msg, append) {
  return; // no debug
  if (!logElement) {
    logElement = document.getElementById('debug-log');
  }
  // logElement.style.display = 'block';
  var now = new Date();
  var time = now.getTime();
  var timeStr = time;
  if (append === true && prevTime != 0) {
    timeStr = time - prevTime;
  }
  prevTime = time;
  var nowStr = now.toLocaleTimeString() + '-' + timeStr;
  msg = JSON.stringify(msg);
  if (append === true) {
    logElement.innerHTML += nowStr + '] ' + msg + '<br>';
  } else {
    logElement.innerHTML = nowStr + '] ' + msg + '<br>';
  }
}

debugLog('debugLog');

window.debugLog = debugLog;

})();
