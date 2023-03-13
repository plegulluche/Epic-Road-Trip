const express = require("express");
const postData = require('./skyscannerControllers')
// Set url as constant
const origin = 'PLACEHOLDER URL HERE'

module.exports.getOrigin = async (req, res) => {
}



module.exports.getFlight = postData(url, dd).then((data) => {
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