const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
    address
  )}.json?access_token=pk.eyJ1IjoicGxlYXNhbnR2aWsiLCJhIjoiY2w3eDkweWsyMHEzYjNvcWs0YzIwMzI2dyJ9.srQfubvj5XJQojEBWisl6A&limit=1`;

  request({ url: url, json: true }, (err, response) => {
    if (err) {
      callback("Unable to connect to location service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location, try another search", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
/**
 * 

const geocodeUrl =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoicGxlYXNhbnR2aWsiLCJhIjoiY2w3eDkweWsyMHEzYjNvcWs0YzIwMzI2dyJ9.srQfubvj5XJQojEBWisl6A&limit=1";

request({ url: geocodeUrl, json: true }, (err, response) => {
  if (err) {
    console.log("Error occur");
  } else if (response.body.features.length === 0) {
    console.log("Insert a valid location");
  } else {
    const latitude = response.body.features[0].center[1];
    const longitude = response.body.features[0].center[0];

    console.log(latitude, longitude);
  }
});
 */
