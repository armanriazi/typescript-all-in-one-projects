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

//-------------***---------//
  // Code: Example usage of ErrorHelper
// Define some response messages to test ErrorHelper
var failureMessage = {
    responseText: {
      "failure": true,
      "errorMessage": "Message From failureMessage"
    }
  };
  
  var failureMessageString = {
    responseText: {
      "failure": "true",
      "errorMessage": "Message from failureMessageString"
    }
  };
  
  var successMessage = {
    responseText: {
      "failure": false
    }
  };
  
  // Check for errors in the response messages and log trace messages accordingly
  if (ErrorHelper.containsErrors(failureMessage))
    ErrorHelper.trace(failureMessage);
  if (ErrorHelper.containsErrors(failureMessageString))
    ErrorHelper.trace(failureMessageString);
  if (!ErrorHelper.containsErrors(successMessage))
    ErrorHelper.trace("success");
    