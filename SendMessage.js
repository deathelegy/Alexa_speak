var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//send message
function SendMessage(request, session, callback){
    console.log("in send message");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "send message now";

    //Now let's recap the trip
    // var recipient=request.intent.slots.recipient.value;
    var recipient=request.intent.slots.recipient.value;
    var message=request.intent.slots.message.value;

    speechOutput+= " to "+ recipient + " message: " + message + ".. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("SendMessage status", speechOutput, "", true));
}

exports.SendMessage = SendMessage;
