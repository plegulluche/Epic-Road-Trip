const eventController = require('../controllers/eventController');
const { requireAuth } = require('../middleware/authMiddleware');
const router = require('express').Router();


router.get('/',

    /*
        #swagger.path = "/events/"
        #swagger.summary = "Get events"
        #swagger.tags = ["Events"]
        #swagger.parameters['location'] = {
            in: 'query',
            description: "Location to search for events",
            required: false,
            type: "string"
        }
        #swagger.parameters['radius'] = {
            in: 'query',
            description: "Radius of search in meters, 500m by default",
            required: false,
            type: "number"
        }
        #swagger.parameters['lat'] = {
            in: 'query',
            description: "Latitude of location to search for events",
            required: false,
            type: "number"
        }
        #swagger.parameters['lng'] = {
            in: 'query',
            description: "Longitude of location to search for events",
            required: false,
            type: "number"
        }
        #swagger.parameters['q'] = {
            in: 'query',
            description: 'Search query',
            type: 'string'
        }
        #swagger.parameters['ids'] = {
            in: 'query',
            description: 'Event ids',
            type: 'string'
        }
        #swagger.parameters['like'] = {
            in: 'query',
            description: 'Event ids',
            type: 'string'
        }
        #swagger.parameters['labels'] = {
            in: 'query',
            description: 'Event labels',
            type: 'string'
        }
        #swagger.parameters['country'] = {
            in: 'query',
            description: 'Event country',
            type: 'string'
        }
        #swagger.parameters['start_around.origin'] = {
            in: 'query',
            description: 'Event start_around.origin',
            type: 'string'
        }
        #swagger.parameters['start_around.offset'] = {
            in: 'query',
            description: 'Event start_around.offset',
            type: 'string'
        }
        #swagger.parameters['start_around.scale'] = {
            in: 'query',
            description: 'Event start_around.scale',
            type: 'string'
        }
        #swagger.parameters['start_around.decay'] = {
            in: 'query',
            description: 'Event start_around.decay',
            type: 'number'
        }
        #swagger.parameters['end_around.origin'] = {
            in: 'query',
            description: 'Event end_around.origin',
            type: 'string'
        }
        #swagger.parameters['end_around.offset'] = {
            in: 'query',
            description: 'Event end_around.offset',
            type: 'string'
        }
        #swagger.parameters['end_around.scale'] = {
            in: 'query',
            description: 'Event end_around.scale',
            type: 'string'
        }
        #swagger.parameters['end_around.decay'] = {
            in: 'query',
            description: 'Event end_around.decay',
            type: 'number'
        }
        #swagger.parameters['location_around.origin'] = {
            in: 'query',
            description: 'Event location_around.origin',
            type: 'string'
        }
        #swagger.parameters['location_around.offset'] = {
            in: 'query',
            description: 'Event location_around.offset',
            type: 'string'
        }
        #swagger.parameters['location_around.scale'] = {
            in: 'query',
            description: 'Event location_around.scale',
            type: 'string'
        }
        #swagger.parameters['location_around.decay'] = {
            in: 'query',
            description: 'Event location_around.decay',
            type: 'number'
        }
        #swagger.parameters['start'] = {
            in: 'query',
            description: 'Event start',
            type: 'string'
        }
        #swagger.parameters['end'] = {
            in: 'query',
            description: 'Event end',
            type: 'string'
        }
        #swagger.parameters['updated'] = {
            in: 'query',
            description: 'Event updated',
            type: 'string'
        }
        #swagger.parameters['rank_level'] = {
            in: 'query',
            description: 'Event rank_level',
            type: 'string'
        }
        #swagger.parameters['local_rank_level'] = {
            in: 'query',
            description: 'Event local_rank_level',
            type: 'string'
        }
        #swagger.parameters['aviation_rank_level'] = {
            in: 'query',
            description: 'Event aviation_rank_level',
            type: 'string'
        }
        #swagger.parameters['duration'] = {
            in: 'query',
            description: 'Event duration',
            type: 'string'
        }
        #swagger.parameters['category'] = {
            in: 'query',
            description: 'Event category',
            type: 'string',
            description: "
                --Attendee categories--\n
                community\n
                concerts\n
                conferences\n
                festivals\n
                performing-arts\n
                sports\n
                expos\n

                --Non-attendee categories--\n
                academic\n
                daylight-savings\n
                observances\n
                politics\n
                public-holidays\n
                school-holidays\n

                --Unscheduled categories--\n
                airport-delays\n
                disasters\n
                health-warnings\n
                severe-weather\n
                terror\n
                ",
            type: 'array',
            items: {
                type: 'string'
            }
        }
        #swagger.parameters['limit'] = {
            in: 'query',
            description: 'Event limit',
            type: 'number'
        }
        #swagger.parameters['offset'] = {
            in: 'query',
            description: 'Event offset',
            type: 'number'
        }
        #swagger.parameters['within'] = {
            in: 'query',
            description: 'Do not use',
            type: 'string'
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            description: 'Event sort',
            type: 'string',
            description: "
                id,
                title,
                start,
                end,
                rank,
                local_rank,
                aviation_rank,
                category,
                duration,
                country,
                labels,
                -id,
                -title,
                -start,
                -end,
                -rank,
                -local_rank,
                -aviation_rank,
                -category,
                -duration,
                -country,
                -labels
            ",
            type: 'array',
            items: {
                type: 'string'
            }
        }
    */

    eventController.getEvents
);

router.get('/recommend',
    /* 
        #swagger.path = "/events/recommend"
        #swagger.tags = ['Event']
        #swagger.description = 'Get recommended events'
        #swagger.parameters['location'] = {
            in: 'query',
            description: "Location to search for events",
            required: false,
            type: "string"
        }
        #swagger.parameters['lat'] = {
            in: 'query',
            description: "Latitude of location to search for events",
            required: false,
            type: "number"
        }
        #swagger.parameters['lng'] = {
            in: 'query',
            description: "Longitude of location to search for events",
            required: false,
            type: "number"
        }
        */
        
eventController.recommendEvents);
module.exports = router;