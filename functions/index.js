'use strict';
const functions = require('firebase-functions');
const netatmo = require('./netatmo-api');
const {dialogflow} = require('actions-on-google');
const fetch = require("node-fetch");
const app = dialogflow({debug: true});

app.intent('InsideTempIntent', (conv) => {
  //conv.localize();
  //This is where the business happens
  return netatmo.stationData().then(station => {
    console.log(station);
    const indoorTemperature = station.dashboard_data.Temperature;
    const outdoorTemperature = station.modules[0].dashboard_data.Temperature;
    conv.close(indoorTemperature + " degrees indoors and " + outdoorTemperature + " outdoors.");
    return;
  });

});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
