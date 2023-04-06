const mongoose = require('mongoose');
const placeSchema = require('./placeModel');

const itinerarySchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    itinerary_name: {
        type: String,
        required: true,
    },
    itinerary_description: {
        type: String,
        required: true,
    },
    itinerary_places: [placeSchema.schema],
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;