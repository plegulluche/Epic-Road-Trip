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

module.exports = router;
