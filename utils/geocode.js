const request = require("request-promise");

const geoCode = (address, callback) => {
  const geocodeUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFqbmlzaDc2IiwiYSI6ImNrOTVrbWhzZzBicWQzZ281bDg1NHFkbDEifQ.R64ExarYzSp_uIvAnaKuhw&limit=1";

  request({ url: geocodeUrl, json: true }, (err, response) => {
    if (err) {
      callback("unable to connect to location service!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search", undefined);
    } else {
      callback(undefined, {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
