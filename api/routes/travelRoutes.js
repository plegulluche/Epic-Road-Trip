const router = require('express').Router();

const foursquareController = require('../controllers/foursquareController');

router.get('/',
    /*
    #swagger.path = "/travel/"
    #swagger.summary = "Get transportation"
    #swagger.tags = ["Travel"]
    #swagger.parameters['location'] = {
    in: 'query',
    description: "Location to search for transportation",
    required: false,
    type: "string"
    }
        #swagger.parameters['lat'] = {
        in: 'query',
        description: "Latitude of location to search for transportation",
        required: false,
        type: "number"
    }
        #swagger.parameters['lng'] = {
        in: 'query',
        description: "Longitude of location to search for transportation",
        required: false,
        type: "number"
    }
        #swagger.parameters['open_now'] = {
        in: 'query',
        description: "Whether to search for transportation that are open now",
        required: false,
        type: "boolean"
    }
        #swagger.parameters['min_price'] = {
        in: 'query',
        description: "Minimum price of transportation to search for (1-4)",
        required: false,
        type: "number"
    }
        #swagger.parameters['max_price'] = {
        in: 'query',
        description: "Maximum price of transportation to search for (1-4)",
        required: false,
        type: "number"
    }
        #swagger.parameters['radius'] = {
        in: 'query',
        description: "Radius of search in meters",
        required: false,
        type: "number"
    }
        #swagger.parameters['category'] = {
        in: 'query',
        default: "19000",
        description: "Categories of transportation service and transport hub to search for.
See codes below:\nAll (19000)\nBaggage Locker (19001)\nBike Rental (19002)\nTransportation Service (19051),\nCharter Bus (19052),\nLimo / Chauffeur (19053),
\nPublic Transportation (19054),\nTransport Hub (19030),\nAirport (19031),\nAirfield (19032),
\nAirport Food Court (19033),\nAirport Gate (19034),\nAirport Lounge (19035),\nAirport Service (19036),
\nAirport Terminal (19037),\nAirport Tram Station (19038),\nBaggage Claim (19039),
\nInternational Airport (19040),\nPrivate Airport (19041),\nBus Station (19042),\nBus Stop (19043),
\nHeliport (19044),\nMarine Terminal (19045),\nMetro Station (19046),\nRail Station (19047),
\nRental Car Location (19048),\nTaxi Stand (19049),\nTram Station (19050)",
        required: false,
        type: "array",
        items: {
        type: "string",
    },
    }
    */
    foursquareController.findRecord
);

module.exports = router;