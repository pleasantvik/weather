const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c220e33465d276b852531301f7a652e7&query=${lat}, ${long}&units=f`;

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to weather", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        weather: response.body.current.weather_descriptions[0],
        precip: response.body.current.temperature,
      });
    }
  });
};

module.exports = forecast;

// const url =
//   "http://api.weatherstack.com/current?access_key=c220e33465d276b852531301f7a652e7&query=37.8267,-122.4233&units=f";

// request({ url, json: true }, (err, response) => {
//   if (err) {
//     return console.log("Error");
//   }
//   console.log(response.body.current);

//   console.log(
//     response.body.current.weather_descriptions[0],
//     `. it is currently ${response.body.current.temperature} and there is ${response.body.current.precip}% chance of rain`
//   );
// });
