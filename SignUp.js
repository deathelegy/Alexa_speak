var alexa = require("alexa-app");
var app = new alexa.app("test");

// Microsoft Graph JavaScript SDK
// npm install msgraph-sdk-javascript
var MicrosoftGraph = require("msgraph-sdk-javascript");

//index function
var delegateSlot = require("./index.js");
var response = require("./index.js");
var isSlot = require("./index.js");

//SignUp
function SignUp(request, session, callback){
    console.log("in Singup");
    console.log("request: "+JSON.stringify(request));
    var sessionAttributes={};
    var filledSlots = delegateSlot.delegateSlotCollection(request, sessionAttributes, callback);

    //compose speechOutput that simply reads all the collected slot values
    var speechOutput = "Singup now";

    //Now let's recap the trip
    // var recipient=request.intent.slots.recipient.value;
    var country=request.intent.slots.country.value;
    var phonenumber=request.intent.slots.phonenumber.value;
    var name=request.intent.slots.name.value;
    var passcode=request.intent.slots.passcode.value;

    speechOutput+= " country: "+ country + " phonenumber: " + phonenumber + " name: " + name + " passcode: "+ passcode + ".. thank you";

    console.log('session: '+JSON.stringify(session));

    //say the results
    callback(sessionAttributes,
        response.buildSpeechletResponse("SignUp status", speechOutput, "", true));
}


exports.SignUp = SignUp;
