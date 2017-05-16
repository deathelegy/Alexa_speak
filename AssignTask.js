var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//AssignTask
function AssignTask(request, session, callback){
    console.log("in assign task");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "AssignTask now";

    var recipient = isSlot.isSlotValid(request, "recipient");
    if (recipient) {
      speechOutput = speechOutput + " assign to " + recipient;
    } else {
      speechOutput += "";
    }

    //Now let's recap the trip
    // var recipient=request.intent.slots.recipient.value;
    var topic=request.intent.slots.topic.value;
    var due_date=request.intent.slots.due_date.value;

    speechOutput+= " topic: "+ topic + " duedate: on " + due_date + ".. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("AssignTask status", speechOutput, "", true));
}

exports.AssignTask = AssignTask;
