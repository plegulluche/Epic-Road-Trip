const userController = require("../controllers/userController");
const router = require('express').Router();
const { requireAuth } = require('../middleware/authMiddleware');

router.post("/event-favorites",
    /*
        #swagger.path = "/user/event-favorites"
        #swagger.summary = "Add event to favorites, "community,concerts,conferences,festivals,performing-arts,sports,expos""
        #swagger.tags = ["User"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Add event to favorites",
            required: true,
            type: "object",
            schema: { $eventFavorites: "string" }
        }
    */
    requireAuth,
    userController.saveEventFavorites
);

router.get("/event-favorites",

    /*
        #swagger.path = "/user/event-favorites"
        #swagger.summary = "Get event favorites by user"
        #swagger.tags = ["User"]
    */
    requireAuth,
    userController.getEventFavorites
);

router.post("/save-address",
    /*
        #swagger.path = "/user/save-address"
        #swagger.summary = "Save address"
        #swagger.tags = ["User"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Save address",
            required: true,
            type: "object",
            schema: { $address: "string" }
            }
            */
    requireAuth,
    userController.saveAddress
);

router.get("/saved-address",
    /*
        #swagger.path = "/user/saved-address"
        #swagger.summary = "Get saved address by user"
        #swagger.tags = ["User"]
    */
    requireAuth,
    userController.getAddress
);

router.post("/save-profile",
    /*
        #swagger.path = "/user/save-profile"
        #swagger.summary = "Save profile"
        #swagger.tags = ["User"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "Save profile",
            required: true,
            type: "object",
            schema: { $favoriteDestination: "string" }
            }
            */
    requireAuth,
    userController.saveProfile
);

router.get("/user-profile",
    /*
        #swagger.path = "/user/user-profile"
        #swagger.summary = "Get saved profile by user"
        #swagger.tags = ["User"]
    */
    requireAuth,
    userController.getProfile
);



module.exports = router;
