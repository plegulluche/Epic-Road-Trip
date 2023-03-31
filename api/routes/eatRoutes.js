const router = require('express').Router();

const foursquareController = require('../controllers/foursquareController');

router.get('/',
    /*
    #swagger.path = "/eats/"
    #swagger.summary = "Get restaurants"
    #swagger.tags = ["Eat"]
    #swagger.parameters['location'] = {
    in: 'query',
    description: "Location to search for restaurants",
    required: false,
    type: "string"
    }
        #swagger.parameters['lat'] = {
        in: 'query',
        description: "Latitude of location to search for restaurants",
        required: false,
        type: "number"
    }
        #swagger.parameters['lng'] = {
        in: 'query',
        description: "Longitude of location to search for restaurants",
        required: false,
        type: "number"
    }
        #swagger.parameters['open_now'] = {
        in: 'query',
        description: "Whether to search for restaurants that are open now",
        required: false,
        type: "boolean"
    }
        #swagger.parameters['min_price'] = {
        in: 'query',
        description: "Minimum price of restaurants to search for (1-4)",
        required: false,
        type: "number"
    }
        #swagger.parameters['max_price'] = {
        in: 'query',
        description: "Maximum price of restaurants to search for (1-4)",
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
        default: "13065",
        description: "Categories of restaurants to search for. 
            See codes below:\nAll (13065),\nFrench Restaurant (13148),\nItalian Restaurant (13236),
            \nJapanese Restaurant (13263),\nMediterranean Restaurant (13302),\nMiddle Eastern Restaurant (13309),
            \nPizza Place (13064),\nSeafood Restaurant (13338),\nSteakhouse (13383),\nThai Restaurant (13352),
            \nTurkish Restaurant (13356),
            \nAmerican Restaurant (13146),\nAsian Restaurant (13147),\nBarbecue Restaurant (13149),
            \nBistro (13150),\nBurger Joint (13151),\nCafé (13152),\nChinese Restaurant (13153),
            \nCoffee Shop (13154),\nDeli / Bodega (13155),\nDiner (13156),\nFast Food Restaurant (13157),
            \nFood Court (13158),\nFood Truck (13159),\nGreek Restaurant (13160),\nIndian Restaurant (13161),
            \nIrish Pub (13162),\nKorean Restaurant (13163),\nLatin American Restaurant (13164),
            \nMexican Restaurant (13165),\nNew American Restaurant (13166),\nPakistani Restaurant (13167),
            \nPizza Place (13168),\nPub (13169),\nRestaurant (13170),\nSandwich Place (13171),
            \nSushi Restaurant (13172),\nTapas Restaurant (13173),\nTea Room (13174),\nVegetarian / Vegan Restaurant (13175),
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