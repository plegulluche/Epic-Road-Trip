const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  business_status: String,
  geometry: {
    location: {
      lat: Number,
      lng: Number,
    },
    locationGeoJSON: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    viewport: {
      northeast: {
        lat: Number,
        lng: Number,
      },
      southwest: {
        lat: Number,
        lng: Number,
      },
    },
  },
  name: String,
  opening_hours: {
    open_now: Boolean,
  },
  photos: [
    {
      height: Number,
      html_attributions: [String],
      photo_reference: String,
      width: Number,
    },
  ],
  place_id: {
    type: String,
    required: true,
    unique: true,
  },
  plus_code: {
    compound_code: String,
    global_code: String,
  },
  price_level: Number,
  rating: Number,
  reference: String,
  scope: String,
  types: [String],
  user_ratings_total: Number,
  vicinity: String,
  dateModified: {
    type: Date,
  },
});
placeSchema.index({ 'geometry.locationGeoJSON': '2dsphere' });

placeSchema.pre(['save', 'findOneAndUpdate'], function (next) {
  this.dateModified = new Date();
  next();
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
