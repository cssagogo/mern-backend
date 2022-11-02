const axios = require("axios");

const HttpError = require("../models/http-error");

const API_KEY = "";

const getCoordsForAddress = async (address) => {
    // return {
    //   lat: 40.7484445,
    //   lng: -73.9878584,
    // };
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = response.data;

  if (!data || data.status === "ZERO_RESULTS") {
    return next(new HttpError(
      "Could not find location for specified address.",
      422
    ));
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
};

module.exports = getCoordsForAddress;