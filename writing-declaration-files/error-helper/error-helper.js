// Code: Error checking and logging utility
var ErrorHelper = (function () {
    return {
      // Method to check if response contains errors
      containsErrors: function (response) {
        if (!response || !response.responseText) {
          return false;
        }
        var errorValue = response.responseText;
        if (String(errorValue.failure) === "true" || Boolean(errorValue.failure)) {
          return true;
        }
        return false;
      },
      // Method to log trace messages
      trace: function (msg) {
        var traceMessage = msg;
        if (msg.responseText) {
          traceMessage = msg.responseText.errorMessage;
        }
        console.log("[" + new Date().toLocaleTimeString() + "] " + traceMessage);
      }
    }
  })(); 


  

    