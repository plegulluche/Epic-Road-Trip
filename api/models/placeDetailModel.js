const mongoose = require('mongoose');

const placeDetailSchema = new mongoose.Schema({
  place_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  address: String,
  rating: Number,
  formatted_address: String,
  formatted_phone_number: String,
  international_phone_number: String,
  url: String,
  website: String,
  types: [String],
  opening_hours: {
    open_now: Boolean,
    periods: [
      {
        close: {
          day: Number,
          time: String,
        },
        open: {
          day: Number,
          time: String,
        },
      },
    ],
    weekday_text: [String],
  },
  geometry: {
    location: {
      lat: Number,
      lng: Number,
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
  photos: [
    {
      height: Number,
      width: Number,
      photo_reference: String,
      html_attributions: [String],
    },
  ],
  reviews: [
    {
      author_name: String,
      author_url: String,
      language: String,
      profile_photo_url: String,
      rating: Number,
      relative_time_description: String,
      text: String,
      time: Number,
    },
  ],
  utc_offset: Number,
  editorial_summary: {
    language: String,
    overview: String,
  }
});

const PlaceDetail = mongoose.model('PlaceDetail', placeDetailSchema);
module.exports = PlaceDetail;