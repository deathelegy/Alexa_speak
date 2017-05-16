var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//BookMeeting
function BookMeeting(request, session, callback){
    console.log("in BookMeeting");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "BookMeeting now";

    //Now let's recap the trip
    // var recipient=request.intent.slots.recipient.value;
    var recipient=request.intent.slots.recipient.value;
    var topic=request.intent.slots.topic.value;
    var meeting_date=request.intent.slots.meeting_date.value;
    var meeting_time=request.intent.slots.meeting_time.value;

    speechOutput+= "To " + recipient +" topic: "+ topic + " meeting date: on " + meeting_date + " meeting time: at "+ meeting_time +".. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("BookMeeting status", speechOutput, "", true));
}

exports.BookMeeting = BookMeeting;
