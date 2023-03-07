const router = require("express").Router();
const searchController = require("../controllers/searchController");
const enjoyController = require("../controllers/enjoyController");
const sleepController = require("../controllers/sleepController");
const travelController = require("../controllers/travelController");
const foodController = require("../controllers/foodController");
const drinkController = require("../controllers/drinkController");
const mapController = require("../controllers/mapController");


// ALL BELOW ROUTE
// *** get all categories of required events,bars,restaurants from a location, need to display top 5 or 10 of each ***
// router.get("/sumary", searchController.getAbstract);

// // ENJOY ROUTES
// // *** get all activities from a location, need to display top 5 or 10 of each ***
// router.get("/enjoy", enjoyController.getActivities);
// // SLEEP ROUTES
// // *** get all hotels from a location, need to display top 5 or 10 of each ***
// router.get("/sleep", sleepController.getSleep);
// // TRAVEL ROUTES
// // *** get all travel from a location, need to display top 5 or 10 of each ***
// router.get("/travel", travelController.getTravel);
// // FOOD ROUTES
// // *** get all food from a location, need to display top 5 or 10 of each ***
// router.get("/eat", foodController.getFood);
// DRINK ROUTES
// *** get all drink from a location, need to display top 5 or 10 of each ***
// router.get("/drink", drinkController.getDrink);
// // SAVE SEARCH ROUTES
// // *** save a search ***
// router.post("/favorites", searchController.saveSearch);
// // GET SEARCH ROUTES
// // *** get all saved searches from a user ***
// router.get("favorites/:user", searchController.getUserFavorites);
router.get('/map', mapController.getLocation);

module.exports = router;
