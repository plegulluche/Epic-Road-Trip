const Amadeus = require("amadeus");
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const fs = require('fs')

const API_KEY = process.env.AMADEUS_API_KEY;
const API_SECRET = process.env.AMADEUS_API_SECRET;

const amadeus = new Amadeus({
  clientId: API_KEY,
  clientSecret: API_SECRET
});

// Find the cheapest flights from define itinerary

getFlight = amadeus.shopping.flightOffersSearch.get({
    originLocationCode: 'CDG',
    destinationLocationCode: 'SYD',
    departureDate: '2023-08-01',
    adults: '1'
  }).then(function (res) {
    response = res.data;
    console.log(Object.keys(response).length)
    for (param in response){
        
    }
    //  fs.writeFileSync('./data.json', JSON.stringify(res.data));
  }).catch(function (res) {
    console.error(res);
  }); 