const mongoose = require('mongoose');
const { Schema } = mongoose;

const savedEventSchema = new Schema({
  relevance: Number,
  id: String,
  title: String,
  description: String,
  category: String,
  labels: [String],
  rank: Number,
  local_rank: Number,
  aviation_rank: Number,
  phq_attendance: Number,
  entities: [Schema.Types.Mixed],
  duration: Number,
  start: Date,
  end: Date,
  updated: Date,
  first_seen: Date,
  timezone: String,
  location: [Number],
  geo: {
    geometry: {
      coordinates: [Number],
      type: String,
    },
    placekey: String,
  },
  scope: String,
  country: String,
  place_hierarchies: [[String]],
  state: String,
  brand_safe: Boolean,
  private: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedEventModel = mongoose.model('SavedEvent', savedEventSchema);

module.exports = SavedEventModel;
