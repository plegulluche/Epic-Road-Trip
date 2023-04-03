// routes/placeDetailRouter.js

const express = require('express');
const { fetchAndSavePlaceDetails } = require('../controllers/placeDetailsController');

const router = express.Router();

router.get('/:fsq_id',
  /*
    #swagger.path = "/place-details/{fsq_id}"
    #swagger.summary = "Fetch Place Details from Foursquare API and save to MongoDB"
    #swagger.tags = ["PlaceDetails"]
    #swagger.parameters['fsq_id'] = {
      in: 'path',
      description: "Foursquare ID of the place",
      required: true,
      type: "string"
    }
  */
  fetchAndSavePlaceDetails
);

module.exports = router;
