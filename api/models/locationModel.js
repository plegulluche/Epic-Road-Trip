const mongoose = require('mongoose');


const locationSchema = new mongoose.Schema({
    location_id:{
        type: String,
        required: [true, 'must get location_id'],
        trim: true   
    },
    type:{
        type: String,
        required: [true, 'must get query date'],
        trim: true
    },
    opening_hours:{
        type: object,
        required: [true, 'must get opening hours'],
    },
    geographic_coordinates:{
            type: Object,
            required: [true, 'must get latitude'],
    },
    global_rate_google:{
        type: String,
        required: [true, 'must get global_rate_google'],
    },
    global_rate_tripadvisor:{
        type: String,
        required: [true, 'must get global_rate_tripadvisor'],
    },
    country_code:{
        type: String,
        required: [true, 'must get country_code'],
    },
    price_range : {
        type: Object,
        required: [true, 'must get price_range'],
    },
});

const Location = mongoose.model('queries',locationSchema);
module.exports = Location