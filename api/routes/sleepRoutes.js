const router = require('express').Router();

const foursquareController = require('../controllers/foursquareController');

router.get('/',
/*
    #swagger.path = "/sleep/"
    #swagger.summary = "Get lodging"
    #swagger.tags = ["Sleep"]
    #swagger.parameters['location'] = {
        in: 'query',
        description: "Location to search for lodging",
        required: false,
        type: "string"
    }
    #swagger.parameters['lat'] = {
        in: 'query',
        description: "Latitude of location to search for lodging",
        required: false,
        type: "number"
    }
    #swagger.parameters['lng'] = {
        in: 'query',
        description: "Longitude of location to search for lodging",
        required: false,
        type: "number"
    }
    #swagger.parameters['open_now'] = {
        in: 'query',
        description: "Whether to search for lodging that are open now",
        required: false,
        type: "boolean"
    }
    #swagger.parameters['min_price'] = {
        in: 'query',
        description: "Minimum price of lodging to search for (1-4)",
        required: false,
        type: "number"
    }
    #swagger.parameters['max_price'] = {
        in: 'query',
        description: "Maximum price of lodging to search for (1-4)",
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
        default: "19009",
        description: "Categories of bars to search for. See codes below:
            All Lodging (19009),
            Bed & Breakfast (19010),
            Boarding House (19011),
            Cottage/Cabin (19012),
            Hostel (19013),
            Hotel (19014),
            Inn (19015),
            Lodge (19016),
            Motel (19017),
            Resort (19018),
            Vacation Rental (19019)",
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