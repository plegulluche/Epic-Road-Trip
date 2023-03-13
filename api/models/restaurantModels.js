const mongoose = require('mongoose');

const EatShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    priceRange: {
        type: String,
        required: false
    },
    typeOfFood: {
        type: String,
        required: true
    },
    photos: {
        type: String,
        required: false
    },
    rating: {
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

const Eat = mongoose.model('Eat', EatShema);

module.exports = Eat;
    