const router = require('express').Router();

const foursquareController = require('../controllers/foursquareController');

router.get('/',
    /*
    #swagger.path = "/enjoy/"
    #swagger.summary = "Get enjoy"
    #swagger.tags = ["Enjoy"]
    #swagger.parameters['location'] = {
    in: 'query',
    description: "Location to search for enjoy",
    required: false,
    type: "string"
    }
        #swagger.parameters['lat'] = {
        in: 'query',
        description: "Latitude of location to search for enjoy",
        required: false,
        type: "number"
    }
        #swagger.parameters['lng'] = {
        in: 'query',
        description: "Longitude of location to search for enjoy",
        required: false,
        type: "number"
    }
        #swagger.parameters['open_now'] = {
        in: 'query',
        description: "Whether to search for enjoy that are open now",
        required: false,
        type: "boolean"
    }
        #swagger.parameters['min_price'] = {
        in: 'query',
        description: "Minimum price of enjoy to search for (1-4)",
        required: false,
        type: "number"
    }
        #swagger.parameters['max_price'] = {
        in: 'query',
        description: "Maximum price of enjoy to search for (1-4)",
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
        default: "14000",
        description: "Categories of events to search for.
See codes below:\nAll (14000),\nConference (14001),\nConvention (14002),
\nEntertainment Event (14003),\nFestival (14004),\nMusic Festival (14005),\nParade (14006),
\nSporting Event (14007),\nLine / Queue (14008),\nMarketplace (14009),\nChristmas Market (14010),
\nStoop Sale (14011),\nStreet Fair (14012),\nStreet Food Gathering (14013),\nTrade Fair (14014),
\nOther Event (14015)",
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