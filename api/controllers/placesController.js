const Place = require('../models/placeModel.js');
const PlaceDetail = require('../models/placeDetailModel.js');
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
  const cachedPlaces = await Place.find({
    types: type,
    'geometry.locationGeoJSON': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
        $maxDistance: radius,
      },
    },
    dateModified: {
      $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Check if data is less than 24 hours old
    },
  });

  if (cachedPlaces.length > 0) {
    console.log('Using cached places');
    return cachedPlaces;
  }

  const response = await client.placesNearby({
    params: {
      location,
      radius,
      type,
      key: apiKey,
    },
    timeout: 1000,
  });

  const results = response.data.results;
  results.forEach(async (result) => {
    await savePlace(result);
  });

  return results;
};

const savePlaceDetail = async (apiPlaceDetail) => {
  const existingPlaceDetail = await PlaceDetail.findOne({ place_id: apiPlaceDetail.place_id });
  if (!existingPlaceDetail) {
    const placeDetail = {
      place_id: apiPlaceDetail.place_id,
      name: apiPlaceDetail.name,
      address: apiPlaceDetail.address,
      rating: apiPlaceDetail.rating,
      // Map other fields from the API response to your schema fields
      formatted_address: apiPlaceDetail.formatted_address,
      formatted_phone_number: apiPlaceDetail.formatted_phone_number,
      international_phone_number: apiPlaceDetail.international_phone_number,
      url: apiPlaceDetail.url,
      website: apiPlaceDetail.website,
      types: apiPlaceDetail.types,
      opening_hours: apiPlaceDetail.opening_hours,
      geometry: apiPlaceDetail.geometry,
      photos: apiPlaceDetail.photos,
      reviews: apiPlaceDetail.reviews,
      utc_offset: apiPlaceDetail.utc_offset,
      editorial_summary: apiPlaceDetail.editorial_summary,
    };

    const newPlaceDetail = new PlaceDetail(placeDetail);
    await newPlaceDetail.save();
  }
};

exports.fetchPlaceDetails = async (req, res) => {
  const { placeId } = req.params;

  try {
    const cachedPlaceDetail = await PlaceDetail.findOne({
      place_id: placeId,
      dateModified: {
        $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Check if data is less than 24 hours old
      },
    });

    if (cachedPlaceDetail) {
      return res.status(200).json(cachedPlaceDetail);
    }

    const response = await client.placeDetails({
      params: {
        place_id: placeId,
        key: apiKey,
      },
      timeout: 1000,
    });

    const placeDetails = response.data.result;
    await savePlaceDetail(placeDetails);

    res.status(200).json(placeDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch place details.' });
  }
};




const savePlace = async (place) => {
  const existingPlace = await Place.findOne({ place_id: place.place_id });
  if (!existingPlace) {
    const newPlace = new Place({
      ...place,
      geometry: {
        ...place.geometry,
        locationGeoJSON: {
          type: 'Point',
          coordinates: [place.geometry.location.lng, place.geometry.location.lat],
        },
      },
    });
    await newPlace.save();
  }
};

exports.getPlaces = async (req, res) => {
  const { address, latitude, longitude, radius, types } = req.query;
  //create a types array from the query string, comma separated
  const typesArray = types.split(',');
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
