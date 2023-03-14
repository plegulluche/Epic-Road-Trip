const mongoose = require('mongoose');
const { Schema } = mongoose;

const placeSchema = new Schema({
  business_status: { type: String },
  geometry: {
    location: {
      lat: { type: Number },
      lng: { type: Number }
    },
    viewport: {
      northeast: {
        lat: { type: Number },
        lng: { type: Number }
      },
      southwest: {
        lat: { type: Number },
        lng: { type: Number }
      }
    }
  },
  name: { type: String },
  opening_hours: {
    open_now: { type: Boolean }
  },
  photos: [
    {
      height: { type: Number },
      html_attributions: [ { type: String } ],
      photo_reference: { type: String },
      width: { type: Number }
    }
  ],
  place_id: { type: String },
  plus_code: {
    compound_code: { type: String },
    global_code: { type: String }
  },
  rating: { type: Number },
  reference: { type: String },
  scope: { type: String },
  types: [ { type: String } ],
  user_ratings_total: { type: Number },
  vicinity: { type: String }
});

module.exports = mongoose.model('Place', placeSchema);