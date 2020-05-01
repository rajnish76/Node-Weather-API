const request = require("request-promise");

const forecast = (longitude, latitude, callback) => {
  const weartherUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    encodeURIComponent(latitude) +
    "&lon=" +
    encodeURIComponent(longitude) +
    "&appid=69d62e3a33cfcea986a5e3a2f75e6c38&units=metric";

  request({ url: weartherUrl, json: true }, (err, response) => {
    if (err) {
      callback("unable to connect to weather service! ", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, { forecast: response.body.current });
    }
  });
};

module.exports = forecast;

//`It is currently ${response.body.current.temp} degree out.There is a ${response.body.current.humidity} humidity and Today ${response.body.daily[0].weather[0].main} in the sky`
