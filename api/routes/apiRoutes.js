const router = require('express').Router();

// ALL BELOW ROUTE
// *** get all categories of required events,bars,restaurants from a location, need to display top 5 or 10 of each ***
router.get('/sumary', searchController.getAbstractByLocation);

// ENJOY ROUTES
// *** get all activities from a location, need to display top 5 or 10 of each ***
router.get('/enjoy', enjoycontroller.getActivitiesByLocation);
// SLEEP ROUTES
// *** get all hotels from a location, need to display top 5 or 10 of each ***
router.get('/sleep', sleepcontroller.getSleepByLocation);
// TRAVEL ROUTES
// *** get all travel from a location, need to display top 5 or 10 of each ***
router.get('/travel', travelcontroller.getTravelByLocation);
// FOOD ROUTES
// *** get all food from a location, need to display top 5 or 10 of each ***
router.get('/eat', foodcontroller.getFoodByLocation);
// DRINK ROUTES
// *** get all drink from a location, need to display top 5 or 10 of each ***
router.get('/drink', drinkcontroller.getDrinkByLocation);
// SAVE SEARCH ROUTES
// *** save a search ***
router.post('/favorites', searchcontroller.saveSearch);
// GET SEARCH ROUTES
// *** get all saved searches from a user ***
router.get('favorites/:user', searchcontroller.getUserFavorites);

module.exports = router;