const mongoose = require('mongoose');

const ActivitiesShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    geocode: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    rating: {
        type: Number,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    duration: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    website: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    }

});

const Activities = mongoose.model('Activities', ActivitiesShema);

module.exports = Activities;
