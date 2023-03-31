// controllers/placeDetailsController.js

const sdk = require('api')('@fsq-developer/v1.0#2ehz6bc12len5ghzp');
const PlaceDetails = require('../models/placeDetailModel');
require('dotenv').config();

sdk.auth(process.env.FOURSQUARE_API_KEY);

const getPlaceDetailsFromAPIAndSave = async (fsq_id) => {
  const { data } = await sdk.placeDetails({ fsq_id });

  const placeDetails = new PlaceDetails(data);
  await placeDetails.save();

  return placeDetails;
};

const fetchAndSavePlaceDetails = async (req, res) => {
  try {
    const { fsq_id } = req.params;
    let placeDetails = await PlaceDetails.findOne({ fsq_id });
    if (!placeDetails) {
      placeDetails = await getPlaceDetailsFromAPIAndSave(fsq_id);
      res.status(200).json({ message: 'PlaceDetails fetched from Foursquare API and saved successfully!', placeDetails });
    } else {
      res.status(200).json({ message: 'PlaceDetails fetched from database!', placeDetails });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching and saving PlaceDetails.' });
  }
};

module.exports = {
  fetchAndSavePlaceDetails,
};
