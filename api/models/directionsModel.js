const mongoose = require('mongoose');

const directionsSchema = new mongoose.Schema({
  bbox: { type: [Number] },
  routes: [
    {
      summary: {
        distance: Number,
        duration: Number,
      },
      segments: [
        {
          distance: Number,
          duration: Number,
          steps : [
            {
              distance: Number,
              duration: Number,
              instruction : String,
              name : String,
              way_points : [Number],
            }
          ],
        },
      ],
      bbox: [Number],
      geometry: String,
      way_points: [Number],
    },
  ],
  metadata: {
    query : {
      coordinates: [ [Number] ],
      profile: String,
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  saved : {
    type: Boolean,
    default: false,
  },
});


//create index for user
directionsSchema.index({ user: 1, createdAt: -1 });
//create index for saved
directionsSchema.index({ saved: 1, createdAt: -1 });
const Direction = mongoose.model('Direction', directionsSchema);

module.exports = Direction;
