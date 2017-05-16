var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//ReadEmail
function ReadEmail(request, session, callback){
    console.log("in ReadEmail");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "ReadEmail now";

    var sender = isSlot.isSlotValid(request, "sender");
    if (sender) {
      speechOutput = speechOutput + " from " + sender;
    } else {
      speechOutput += "";
    }

    //Now let's recap the trip
    // var recipient=request.intent.slots.recipient.value;

    speechOutput+= " .. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("ReadEmail status", speechOutput, "", true));
}

exports.ReadEmail = ReadEmail;
