// controllers/placeDetailsController.js

const sdk = require('api')('@fsq-developer/v1.0#2ehz6bc12len5ghzp');
const PlaceDetails = require('../models/placeDetailModel');
require('dotenv').config();
const apiKey = process.env.GOOGLE_API_KEY;
sdk.auth(process.env.FOURSQUARE_API_KEY);

const getStaticMapUrl = ({ latitude, longitude, zoom = 16, width = 400, height = 400 }) => {
  const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
  const marker = `markers=color:red%7C${latitude},${longitude}`;
  const size = `${width}x${height}`;
  const url = `${baseUrl}?${marker}&zoom=${zoom}&size=${size}&key=${apiKey}`;

  return url;
};

const getPlaceDetailsFromAPIAndSave = async (fsq_id) => {
  const { data } = await sdk.placeDetails({ fsq_id });

  const placeDetails = new PlaceDetails(data);
  const locationImageUrl = getStaticMapUrl({
    latitude: placeDetails.geocodes.main.latitude,
    longitude: placeDetails.geocodes.main.longitude,
  });
    placeDetails.static_map_url = locationImageUrl;
  await placeDetails.save();

  return placeDetails;
};

const fetchAndSavePlaceDetails = async (req, res) => {
    try {
      const { fsq_id } = req.params;
      let placeDetails = await PlaceDetails.findOne({ fsq_id });
      if (!placeDetails) {
        placeDetails = await getPlaceDetailsFromAPIAndSave(fsq_id);
        
        //append the image 
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
