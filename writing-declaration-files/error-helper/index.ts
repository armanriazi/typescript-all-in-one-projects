import * as ErrorHelper from "./globals.d";
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