//the global reference to the API 
var API   = {};

// SET PROTOTYPE TO CURRENT API = Sequence or Logitech

//APIInstance.__proto__ = sequenceAPI;  // instance becomes the "this"
API.__proto__ = sequenceAPI;  // instance becomes the "this"

// Add helper methods to the loaded API
for(var method in APIHelpers){API[method] = APIHelpers[method];}
