var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//SendEmail
function SendEmail(request, session, callback){
    console.log("in SendEmail");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "SendEmail now";

    var recipient=request.intent.slots.recipient.value;
    var content=request.intent.slots.content.value;

    speechOutput+= "　recipient: " +　recipient + " content: " + content + " .. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("SendEmail status", speechOutput, "", true));
}

exports.SendEmail = SendEmail;
