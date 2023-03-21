const express = require('express');
const router = express.Router();
const placesController = require('../controllers/placesController');

router.get('/',
    /*
        #swagger.path = "/places"
        #swagger.tags = ['Places']
        #swagger.description = 'Endpoint to fetch nearby places based on latitude, longitude, and radius.'
        #swagger.parameters['latitude'] = {
            in: 'query',
            description: 'Latitude of the location to search for nearby places.',
            type: 'number'
        }
        #swagger.parameters['longitude'] = {
            in: 'query',
            description: 'Longitude of the location to search for nearby places.',
            type: 'number'
        }
        #swagger.parameters['address'] = {
            in: 'query',
            description: 'Address of the location to search for nearby places.',
            type: 'string'
        }
        #swagger.parameters['radius'] = {
            in: 'query',
            description: 'Radius (in meters) of the area to search for nearby places.',
            required: true,
            type: 'integer'
        }
        #swagger.parameters['types'] = {
        in: 'query',
        description: 'Types of places to search for.',
        required: true,
        type: 'array',
    }
        
        #swagger.responses[200] = {
            description: 'A list of nearby places.',
            schema: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the place.'
                        },
                        address: {
                            type: 'string',
                            description: 'The address of the place.'
                        },
                        location: {
                            type: 'object',
                            description: 'The coordinates of the place.',
                            properties: {
                                lat: {
                                    type: 'number',
                                    description: 'The latitude of the place.'
                                },
                                lng: {
                                    type: 'number',
                                    description: 'The longitude of the place.'
                                }
                            }
                        }
                    }
                }
            }
        }
        #swagger.responses[500] = {
            description: 'Failed to fetch places.'
        }
    
    */

    placesController.getPlaces);

module.exports = router;
