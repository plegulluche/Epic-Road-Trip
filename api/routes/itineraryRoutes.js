// routes/itineraryRoutes.js

const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/authMiddleware');
const itineraryController = require('../controllers/itineraryController');

// CREATE a new itinerary
router.post('/',

    /*
        #swagger.path = "/itineraries"
        #swagger.summary = "Create a new itinerary"
        #swagger.tags = ["Itineraries"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Create a new itinerary",
            required: true,
            type: "object",
            schema: {
                $itinerary_name: "string",
                $itinerary_description: "string",
                $itinerary_places: [
                    {
                        fsq_id: "string",
                        categories: [
                            {
                                id: 0,
                                name: "string",
                                icon: {
                                    prefix: "string",
                                    suffix: "string"
                                }
                            }
                        ],
                        chains: ["string"],
                        geocodes: {
                            drop_off: {
                                latitude: 0,
                                longitude: 0
                            },
                            main: {
                                latitude: 0,
                                longitude: 0
                            },
                            roof: {
                                latitude: 0,
                                longitude: 0
                            }
                        },
                        place_images: ["string"],
                        link: "string",
                        location: {
                            address: "string",
                            admin_region: "string",
                            country: "string",
                            cross_street: "string",
                            formatted_address: "string",
                            locality: "string",
                            postcode: "string",
                            region: "string"
                        },
                        name: "string",
                        related_places: {},
                        timezone: "string"
                    }
                ]
                   
        }
    }
    */

    requireAuth,
    itineraryController.createItinerary);

// READ all itineraries for a given user
router.get('/',

    /*
        #swagger.path = "/itineraries"
        #swagger.summary = "Get all itineraries for a given user"
        #swagger.tags = ["Itineraries"]
    */

    requireAuth,
    itineraryController.getItineraries);

// READ a specific itinerary by ID
router.get('/:id',
    /*
    #swagger.path = "/itineraries/{id}"
    #swagger.summary = "Get a specific itinerary by ID"
    #swagger.tags = ["Itineraries"]
    #swagger.parameters['id'] = {
        in: 'path',
        description: "Get a specific itinerary by ID",
        required: true,
        type: "string"
    }
*/

    itineraryController.getItineraryById);

// UPDATE an itinerary by ID
router.patch('/:id',

    /*
        #swagger.path = "/itineraries/{id}"
        #swagger.summary = "Update a new itinerary"
        #swagger.tags = ["Itineraries"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Create a new itinerary",
            required: true,
            type: "object",
            schema: {
                $itinerary_name: "string",
                $itinerary_description: "string",
                $itinerary_places: [
                    {
                        fsq_id: "string",
                        categories: [
                            {
                                id: 0,
                                name: "string",
                                icon: {
                                    prefix: "string",
                                    suffix: "string"
                                }
                            }
                        ],
                        chains: ["string"],
                        geocodes: {
                            drop_off: {
                                latitude: 0,
                                longitude: 0
                            },
                            main: {
                                latitude: 0,
                                longitude: 0
                            },
                            roof: {
                                latitude: 0,
                                longitude: 0
                            }
                        },
                        place_images: ["string"],
                        link: "string",
                        location: {
                            address: "string",
                            admin_region: "string",
                            country: "string",
                            cross_street: "string",
                            formatted_address: "string",
                            locality: "string",
                            postcode: "string",
                            region: "string"
                        },
                        name: "string",
                        related_places: {},
                        timezone: "string"
                    }
                ]
        }
    }
    */

    itineraryController.updateItinerary);

// DELETE an itinerary by ID
router.delete('/:id',
    /*
    #swagger.path = "/itineraries/{id}"
    #swagger.summary = "Delete an itinerary by ID"
    #swagger.tags = ["Itineraries"]
    #swagger.parameters['id'] = {
        in: 'path',
        description: "Delete an itinerary by ID",
        required: true,
        type: "string"
    }
*/


    itineraryController.deleteItinerary);

module.exports = router;
