// models/placeModel.js

const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  fsq_id: {
    type: String,
    required: true,
  },
  categories: [
    {
      id: Number,
      name: String,
      icon: {
        prefix: String,
        suffix: String,
      },
    },
  ],
  chains: [String],
  geocodes: {
    drop_off: {
      latitude: Number,
      longitude: Number,
    },
    main: {
      latitude: Number,
      longitude: Number,
    },
    roof: {
      latitude: Number,
      longitude: Number,
    },
  },
  place_images: [String],
  link: String,
  location: {
    address: String,
    admin_region: String,
    country: String,
    cross_street: String,
    formatted_address: String,
    locality: String,
    postcode: String,
    region: String,
  },
  name: String,
  related_places: mongoose.Schema.Types.Mixed,
  timezone: String,
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
