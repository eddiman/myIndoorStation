const fetch = require("node-fetch");
const {URLSearchParams} = require('url')
const config = require('./config');
const configAuth = {
  grant_type: "password",
  client_id : config.client_id,
  client_secret : config.client_secret,
  username : config.username,
  password : config.password,
  scope: "read_station read_thermostat"
};

const paramUrl= "https://api.netatmo.com/oauth2/token?" +
"grant_type=" + configAuth.grant_type +
"&client_id=" + configAuth.client_id +
"&client_secret=" + configAuth.client_secret +
"&username=" + configAuth.username +
"&password=" + configAuth.password +
"&scope=" + configAuth.scope;
const stationUrl = "https://api.netatmo.net/api/getstationsdata?device_id=70:ee:50:33:14:14";

var urlencoded = new URLSearchParams();
urlencoded.append("grant_type", "password");
urlencoded.append("client_id",  config.client_id);
urlencoded.append("client_secret", config.client_secret);
urlencoded.append("username", config.username);
urlencoded.append("password", config.password);
urlencoded.append("scope", "read_station read_thermostat");


const accessToken = async () => {
  try {
    const response = await fetch("https://api.netatmo.com/oauth2/token",
    {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: urlencoded});
    const json = await response.json();
    return json.access_token;
  } catch (error) {
    console.log(error);
  }
};

const stationData = async () => {
  try {
    const token = await accessToken();
    const response = await fetch(stationUrl, {headers: {'Authorization': 'Bearer ' + token}}) ;
    const json = await response.json();
    return json.body.devices[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports.accessToken = accessToken;
module.exports.stationData = stationData;
