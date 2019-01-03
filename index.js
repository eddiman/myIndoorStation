var netatmo = require('netatmo');
var express = require('express');
var config = require('./config');
var bodyParser = require('body-parser');


var app = express();
app.use(bodyParser.json());

var auth = {
  "client_id": config.client_id,
  "client_secret": config.client_secret,
  "username": config.username,
  "password": config.password,
};

app.post('/netatmo/api/allstations', function(req, res, next) {

  var api = new netatmo(auth);

  // Get Stations Data
  // See docs: https://dev.netatmo.com/dev/resources/technical/reference/weatherstation/getstationsdata
  api.getStationsData(function(err, devices) {
    res.send(JSON.stringify(devices));
  });

});


//Should return temperature of all modules,
//TODO: Generate response string based on how many modules in station
app.post('/netatmo/api/insidetemp', function(req, res, next) {

  console.log(req.body.queryResult.intent.displayName);

  var intent = req.body.queryResult.intent.displayName;

  //console.log(res.body);
  //console.log(next);

  var api = new netatmo(auth);

  // Get Stations Data
  // See docs: https://dev.netatmo.com/dev/resources/technical/reference/weatherstation/getstationsdata
  api.getStationsData(function(err, devices) {

    var ResponseString = '';

    var StartString
    = "The living room temperature is " + JSON.stringify(devices[0].dashboard_data.Temperature) +
    " degrees, and the outdoor temperature is " + JSON.stringify(devices[0].modules[0].dashboard_data.Temperature) + " degrees";

    var InsideDetailsString =
    "The living room CO2-levels are at " + JSON.stringify(devices[0].dashboard_data.CO2) + " ppm, " +
    "the humidity is at " + JSON.stringify(devices[0].dashboard_data.Humidity) + " percent, " +
    "and the noise level is " + JSON.stringify(devices[0].dashboard_data.Noise) + " dBm.";

    var OutsideDetailsString =
    "The outside temperature is " + JSON.stringify(devices[0].modules[0].dashboard_data.Temperature) + " degrees, " +
    "and the humidity is at " + JSON.stringify(devices[0].modules[0].dashboard_data.Humidity) + " percent";

    if (intent ===  "InsideTempIntent") {
 ResponseString = StartString
} else if (intent ===  "InsideDetailsIntent") {
  ResponseString = InsideDetailsString

} else if (intent ===  "OutsideDetailsIntent") {
  ResponseString = OutsideDetailsString

}




    var response4 = {
      "fulfillmentText": ResponseString,
      "fulfillmentMessages": [
        {
          "simpleResponses": {
            "simpleResponses":
            [
              {
                "textToSpeech": ResponseString,
                "displayText": ResponseString
              }
            ]
          }
        }
      ]
    }

    res.send(response4);
  });

});

//Returns the details for the inside module
app.post('/netatmo/api/insidedetails', function(req, res, next) {

  var api = new netatmo(auth);

  // Get Stations Data
  // See docs: https://dev.netatmo.com/dev/resources/technical/reference/weatherstation/getstationsdata
  api.getStationsData(function(err, devices) {


    var StartString =
    "The living room CO2-levels are at " + JSON.stringify(devices[0].dashboard_data.CO2) + " ppm, " +
    "the humidity is at " + JSON.stringify(devices[0].dashboard_data.Humidity) + " percent, " +
    "and the noise levels are " + JSON.stringify(devices[0].dashboard_data.Noise) + " dBm.";

    var response4 = {
      "fulfillmentText": StartString,
      "fulfillmentMessages": [
        {
          "simpleResponses": {
            "simpleResponses":
            [
              {
                "textToSpeech": StartString,
                "displayText": StartString
              }
            ]
          }
        }
      ]
    }

    res.send(response4);
  });

});



var port = process.env.PORT || 8000;
app.listen(port, "0.0.0.0");
console.log('Running on http://localhost:8000');
