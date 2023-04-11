// models/searchParameters.js

const mongoose = require("mongoose");

const searchParametersSchema = new mongoose.Schema({
  location: {
    type: String,
    required: false,
  },
  lat: {
    type: Number,
    required: false,
  },
  lng: {
    type: Number,
    required: false,
  },
  open_now: {
    type: Boolean,
    required: false,
  },
  min_price: {
    type: Number,
    required: false,
    min: 1,
    max: 4,
  },
  max_price: {
    type: Number,
    required: false,
    min: 1,
    max: 4,
  },
  radius: {
    type: Number,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

searchParametersSchema.statics.getByUserId = async function (userId) {
  return await this.findOne({ user: userId });
};

const SearchParameters = mongoose.model(
  "SearchParameters",
  searchParametersSchema
);

module.exports = SearchParameters;
