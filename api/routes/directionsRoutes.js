const router = require('express').Router();
const directionsController = require("../controllers/directionsController");
const { requireAuth } = require('../middleware/authMiddleware');

//auth
router.post("/",
    /*
        #swagger.path = "/directions"
        #swagger.summary = "Get route coordinates"
        #swagger.tags = ["Directions"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Get route coordinates",
            required: true,
            type: "object",
            schema: { $origin: {lat: 0, lng: 0}, $destination: {lat: 0, lng: 0}, $waypoints: [{lat: 0, lng: 0}]}
        }
    */
    requireAuth,
    directionsController.getRouteCoordinates
);

router.get("/",
    /*
        #swagger.path = "/directions"
        #swagger.summary = "Get directions history by user"
        #swagger.tags = ["Directions"]
    */
    requireAuth,
    directionsController.getDirectionsHistoryByUser
);

router.get("/saved/",
    /*
        #swagger.path = "/directions/saved/"
        #swagger.summary = "Get saved directions by user"
        #swagger.tags = ["Directions"]
    */
    requireAuth,
    directionsController.getSavedDirectionsByUser
);
        


module.exports = router;