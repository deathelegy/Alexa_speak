var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//ReadCalendar
function ReadCalendar(request, session, callback){
    console.log("in ReadCalendar");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "ReadCalendar now";

    var event_date = isSlot.isSlotValid(request, "event_date");
    if (event_date) {
      speechOutput = speechOutput + " on " + event_date;
    } else {
      speechOutput += " on today ";
    }

    //Now let's recap the trip
    // var recipient=request.intent.slots.recipient.value;

    speechOutput+= " .. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("ReadCalendar status", speechOutput, "", true));
}

exports.ReadCalendar = ReadCalendar;
