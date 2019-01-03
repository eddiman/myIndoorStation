function makeTempString(devices) {
  var string = "The ";

  for (i = 0; i < devices[0].length; i++) {
    string += devices[0].module_name + " temperature is " + devices[0].dashboard_data.Temperature;

    for (i = 0; i < devices[0].modules.length; i++) {
      string += devices[0].modules[i].module_name + " temperature is " + devices[0].modules[i].dashboard_data.Temperature;

    }


  }
}
var TempString = () => {
  var string = "The ";

  for (i = 0; i < devices[0].length; i++) {
    string += devices[0].module_name + " temperature is " + devices[0].dashboard_data.Temperature;

    for (i = 0; i < devices[0].modules.length; i++) {
      string += devices[0].modules[i].module_name + " temperature is " + devices[0].modules[i].dashboard_data.Temperature;

    }


    return TempString;
  }
}
