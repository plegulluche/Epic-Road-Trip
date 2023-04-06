const sdk = require('api')('@fsq-developer/v1.0#2ehz6bc12len5ghzp');
require('dotenv').config();
const { Client } = require('@googlemaps/google-maps-services-js');
const PlaceDetails = require('../models/placeDetailModel');
const client = new Client({});

//this is dumb
const {getPlaceDetailsFromAPIAndSave} = require('./placeDetailsController');

const googleApiKey = process.env.GOOGLE_API_KEY;

const geocodeAddress = async (address) => {
    const response = await client.geocode({
        params: {
            address,
            key: googleApiKey,
        },
    });

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
};

// Load environment variables

// Authenticate with Foursquare API
sdk.auth(process.env.FOURSQUARE_API_KEY);
//default enum

const findRecord = async (req, res, type) => {

    const searchQuery = {
        ll: `${req.query.lat ?? 0},${req.query.lng ?? 0}`,
        radius: '1000',
        limit: '10',
    };
    if (req.query.open_now) {
        searchQuery.open_now = req.query.open_now;
    }
    if (req.query.min_price) {
        searchQuery.min_price = req.query.min_price;
    }
    if (req.query.max_price) {
        searchQuery.max_price = req.query.max_price;
    }
    if (req.query.radius) {
        searchQuery.radius = req.query.radius;
    }
    if (req.query.location) {
        const { lat, lng } = await geocodeAddress(req.query.location);
        searchQuery.ll = `${lat},${lng}`;
    }
    if (req.query.category) {
        searchQuery.categories = req.query.category;
    }
    


    sdk
        .placeSearch(searchQuery)
        .then(async ({ data }) => { // <-- Make sure to add async here
            let venues = data.results;
            
            for (const venue of venues) { // Use for...of loop instead of forEach
                const placeDetails = await getPlaceDetailsFromAPIAndSave(venue.fsq_id);
                if(!placeDetails) continue;
                const {place_images, ...rest} = placeDetails;
                //send only first three images
                venue.place_images = place_images.slice(0, 3);
            }
            
            //reconstruct the response
            const response = {
                ...data,
                results: venues,
            };
            return res.status(200).json(response);
        })
        .catch((err) => {
            console.error('Error fetching data from Foursquare API:', err);
            return res.status(500).json({ error: 'Error fetching data from Foursquare API' });
        });
};

module.exports = {
    findRecord,
};
