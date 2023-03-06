const router = require('express').Router();

// ALL BELOW ROUTE
// *** get all categories of required events,bars,restaurants from a location, need to display top 5 or 10 of each ***
router.get('/sumary/location', searchController.getAbstractByLocation);

// ENJOY ROUTES
// *** get all activities from a location, need to display top 5 or 10 of each ***
router.get('/enjoy/location', enjoycontroller.getActivitiesByLocation);
// *** get a refined searched based on params given in the URI query string
router.get('/enjoy/location/:params', enjoycontroller.getActivitiesByLocation);


// SLEEP ROUTES
// *** get all hotels from a location, need to display top 5 or 10 of each ***
router.get('/sleep/location', sleepcontroller.getSleepByLocation);

// TRAVEL ROUTES
// *** get all travel from a location, need to display top 5 or 10 of each ***
router.get('/travel/location', travelcontroller.getTravelByLocation);

// FOOD ROUTES
// *** get all food from a location, need to display top 5 or 10 of each ***
router.get('/food/location', foodcontroller.getFoodByLocation);

// DRINK ROUTES
// *** get all drink from a location, need to display top 5 or 10 of each ***
router.get('/drink/location', drinkcontroller.getDrinkByLocation);

// SAVE SEARCH ROUTES
// *** save a search ***
router.post('/search/save', searchcontroller.saveSearch);

// GET SEARCH ROUTES
// *** get all saved searches from a user ***
router.get('search/user', searchcontroller.getSearchByUser);

module.exports = router;