const router = require("express").Router();
const foodController = require("../controllers/foodController");
const sleepController = require("../controllers/sleepController");
const mapTools = require('../utils/maps.utils');

router.get("/food/filldb", foodController.getFoodData);
/*
        #swagger.path = "/food/filldb"
        #swagger.summary = "Fill db with food data"
        #swagger.tags = ["Eat"]
        #swagger.parameters['obj'] = {
            in: 'body',
            description: "User to register",
            required: true,
            type: "object",
            schema: { $adress: "string" }
        }
    */

router.get('/map/geocoding', mapTools.getLocation);
router.get('/map/reversed', mapTools.getAddress);

module.exports = router;
