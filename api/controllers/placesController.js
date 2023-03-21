const Place = require('../models/placeModel.js');
const { Client } = require('@googlemaps/google-maps-services-js');
const dotenv = require('dotenv');
const client = new Client({});

const apiKey = dotenv.config().parsed.GOOGLE_API_KEY;
const geocodeAddress = async (address) => {
  const response = await client.geocode({
    params: {
      address,
      key: apiKey,
    },
  });

  const { lat, lng } = response.data.results[0].geometry.location;
  return { lat, lng };
};

const fetchPlaces = async (location, radius, type) => {
  const response = await client.placesNearby({
    params: {
      location,
      radius,
      type,
      key: apiKey,
    },
    timeout: 1000,
  });
  return response.data.results;
};

const savePlace = async (place) => {
  const existingPlace = await Place.findOne({ place_id: place.place_id });
  if (!existingPlace) {
    const newPlace = new Place(place);
    await newPlace.save();
  }
};

exports.getPlaces = async (req, res) => {
  const { address, latitude, longitude, radius, types } = req.query;
  //create a types array from the query string, comma separated
  const typesArray = types.split(',');
  console.log(typesArray)
  let location = null;
  if(address) {
    location = await geocodeAddress(address);
  } else {    
    location = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
  }
  const intRadius = parseInt(radius);

  try {
    const allResults = [];

    for (const type of typesArray) {
      const results = await fetchPlaces(location, intRadius, type);
      allResults.push(...results);

      for (const result of results) {
        await savePlace(result);
      }
    }

    res.status(200).json(allResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch places.' });
  }
};
