// routes/searchParametersRouter.js

const express = require('express');
const { saveSearchParameters, getSearchParameters } = require('../controllers/searchParametersController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',
    /*
    #swagger.path = "/search-parameters"
    #swagger.summary = "Save search parameters"
    #swagger.tags = ["SearchParameters"]
    #swagger.parameters['location'] = {
      in: 'query',
      name: 'location',
      description: 'Location to search for enjoy',
      required: false,
      type: 'string',
    }
    #swagger.parameters['lat'] = {
      in: 'query',
      name: 'lat',
      description: 'Latitude of location to search for enjoy',
      required: false,
      type: 'number',
    }
    #swagger.parameters['lng'] = {
      in: 'query',
      name: 'lng',
      description: 'Longitude of location to search for enjoy',
      required: false,
      type: 'number',
    }
    #swagger.parameters['open_now'] = {
      in: 'query',
      name: 'open_now',
      description: 'Whether to search for enjoy that are open now',
      required: false,
      type: 'boolean',
    }
    #swagger.parameters['min_price'] = {
      in: 'query',
      name: 'min_price',
      description: 'Minimum price of enjoy to search for (1-4)',
      required: false,
      type: 'number',
    }
    #swagger.parameters['max_price'] = {
      in: 'query',
      name: 'max_price',
      description: 'Maximum price of enjoy to search for (1-4)',
      required: false,
      type: 'number',
    }
    #swagger.parameters['radius'] = {
      in: 'query',
      name: 'radius',
      description: 'Radius of search in meters',
      required: false,
      type: 'number',
    }
    #swagger.parameters['category'] = {
      in: 'query',
      name: 'category',
      description: 'Categories of events to search for',
      required: false,
      type: 'array',
      items: {
        type: 'string',
      }
      }
      #swagger.parameters['user'] = {
          "name": "user",
          "in": "query",
          "description": "User to save search parameters for",
          "required": true,
          "type": "string"
      },
    }
  */
    requireAuth,
    saveSearchParameters
);

router.get('/',
    /*
    #swagger.path = "/search-parameters"
    #swagger.summary = "Get search parameters"
    #swagger.tags = ["SearchParameters"]
*/
    requireAuth,
    getSearchParameters
);

module.exports = router;
