const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { response } = require('express');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({path:"./../config.env"});
const dd = require('./body.json');
const url = "https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create?";

// Call the API endpoint using the fetch() method

postData = async (url, data)  => {
    // Default options are marked with *
    try {      
        const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/json",
            "x-api-key" : process.env.SKYSCANNER_API_KEY,
      },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
    );
    return response.json(); // parses JSON response into native JavaScript objects
  } catch(err) {
    response.status(404).json({
        status:'ressource not found',
        message:err
    });
  }
};

postData(url, dd).then((data) => {
    return data
}) .then((data) =>{
    
// JSON data parsed by `data.json()` call

let bestIds = {}, cheapestIds = {}, fastestIds = {}, finalDataIds = {}
if (data['content']['sortingOptions']['best'].length > 3) {
  for (let i = 0; i < 3; i++) {
    
        Object.assign(bestIds, {[i]: {
            itineraryId:data['content']['sortingOptions']['best'][i]['itineraryId'],
            price: data['content']['results']['itineraries'][data['content']['sortingOptions']['best'][i]['itineraryId']]['pricingOptions'][0]['price']['amount'],
            link: data['content']['results']['itineraries'][data['content']['sortingOptions']['best'][i]['itineraryId']]['pricingOptions'][0]['items'][0]['deepLink'],
            agent: data['content']['results']['agents'][data['content']['results']['itineraries'][data['content']['sortingOptions']['best'][i]['itineraryId']]['pricingOptions'][0]['agentIds'][0]]    
            }});

        Object.assign(cheapestIds, {[i]: {
            itineraryId:data['content']['sortingOptions']['cheapest'][i]['itineraryId'],
            price: data['content']['results']['itineraries'][data['content']['sortingOptions']['cheapest'][i]['itineraryId']]['pricingOptions'][0]['price']['amount'],
            link: data['content']['results']['itineraries'][data['content']['sortingOptions']['cheapest'][i]['itineraryId']]['pricingOptions'][0]['items'][0]['deepLink'],
            agent: data['content']['results']['agents'][data['content']['results']['itineraries'][data['content']['sortingOptions']['cheapest'][i]['itineraryId']]['pricingOptions'][0]['agentIds'][0]]    
            }});


        Object.assign(fastestIds, {[i]: {
            itineraryId:data['content']['sortingOptions']['fastest'][i]['itineraryId'],
            price: data['content']['results']['itineraries'][data['content']['sortingOptions']['fastest'][i]['itineraryId']]['pricingOptions'][0]['price']['amount'],
            link: data['content']['results']['itineraries'][data['content']['sortingOptions']['fastest'][i]['itineraryId']]['pricingOptions'][0]['items'][0]['deepLink'],
            agent: data['content']['results']['agents'][data['content']['results']['itineraries'][data['content']['sortingOptions']['fastest'][i]['itineraryId']]['pricingOptions'][0]['agentIds'][0]]    
            }});

}}else {
for (let i = 0; i < data['content']['sortingOptions']['best'].length; i++) {
    Object.assign(bestIds, {[i]: {
        itineraryId:data['content']['sortingOptions']['best'][i]['itineraryId'],
        price: data['content']['results']['itineraries'][data['content']['sortingOptions']['best'][i]['itineraryId']]['pricingOptions'][0]['price']['amount'],
        link: data['content']['results']['itineraries'][data['content']['sortingOptions']['best'][i]['itineraryId']]['pricingOptions'][0]['items'][0]['deepLink'],
        agent: data['content']['results']['agents'][data['content']['results']['itineraries'][data['content']['sortingOptions']['best'][i]['itineraryId']]['pricingOptions'][0]['agentIds'][0]]    
        }});

    Object.assign(cheapestIds, {[i]: {
        itineraryId:data['content']['sortingOptions']['cheapest'][i]['itineraryId'],
        price: data['content']['results']['itineraries'][data['content']['sortingOptions']['cheapest'][i]['itineraryId']]['pricingOptions'][0]['price']['amount'],
        link: data['content']['results']['itineraries'][data['content']['sortingOptions']['cheapest'][i]['itineraryId']]['pricingOptions'][0]['items'][0]['deepLink'],
        agent: data['content']['results']['agents'][data['content']['results']['itineraries'][data['content']['sortingOptions']['cheapest'][i]['itineraryId']]['pricingOptions'][0]['agentIds'][0]]    
        }});


    Object.assign(fastestIds, {[i]: {
        itineraryId:data['content']['sortingOptions']['v'][i]['itineraryId'],
        price: data['content']['results']['itineraries'][data['content']['sortingOptions']['fastestIds'][i]['itineraryId']]['pricingOptions'][0]['price']['amount'],
        link: data['content']['results']['itineraries'][data['content']['sortingOptions']['fastestIds'][i]['itineraryId']]['pricingOptions'][0]['items'][0]['deepLink'],
        agent: data['content']['results']['agents'][data['content']['results']['itineraries'][data['content']['sortingOptions']['fastestIds'][i]['itineraryId']]['pricingOptions'][0]['agentIds'][0]]    
        }});

}};
finalDataIds = Object.assign(finalDataIds, {bestIds:bestIds,cheapestIds:cheapestIds,fastestIds:fastestIds})
return finalDataIds

}).then((data) => {
    fs.writeFileSync('./sddd.json', JSON.stringify(data))
}); 