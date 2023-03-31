const router = require('express').Router();

const foursquareController = require('../controllers/foursquareController');

router.get('/',
/*
    #swagger.path = "/drinks/"
    #swagger.summary = "Get bars"
    #swagger.tags = ["Drink"]
    #swagger.parameters['location'] = {
        in: 'query',
        description: "Location to search for bars",
        required: false,
        type: "string"
    }
    #swagger.parameters['lat'] = {
        in: 'query',
        description: "Latitude of location to search for bars",
        required: false,
        type: "number"
    }
    #swagger.parameters['lng'] = {
        in: 'query',
        description: "Longitude of location to search for bars",
        required: false,
        type: "number"
    }
    #swagger.parameters['open_now'] = {
        in: 'query',
        description: "Whether to search for bars that are open now",
        required: false,
        type: "boolean"
    }
    #swagger.parameters['min_price'] = {
        in: 'query',
        description: "Minimum price of bars to search for (1-4)",
        required: false,
        type: "number"
    }
    #swagger.parameters['max_price'] = {
        in: 'query',
        description: "Maximum price of bars to search for (1-4)",
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
        default: "13003",
        description: "Categories of bars to search for. See codes below:
        All Bar (13003),
        Apres Ski Bar (13004),
        Beach Bar (13005),
        Beer Bar (13006),
        Beer Garden (13007),
        Champagne Bar (13008),
        Cocktail Bar (13009),
        Dive Bar (13010),
        Gay Bar (13011),
        Hookah Bar (13012),
        Hotel Bar (13013),
        Ice Bar (13014),
        Karaoke Bar (13015),
        Lounge (13016),
        Piano Bar (13017),
        Pub (13018),
        Rooftop Bar (13019),
        Sake Bar (13020),
        Speakeasy (13021),
        Sports Bar (13022),
        Tiki Bar (13023),
        Whisky Bar (13024),
        Wine Bar (13025)
        ",
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