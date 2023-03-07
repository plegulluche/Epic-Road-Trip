const express = require("express");
const fetch = require("node-fetch");


const url1 = 'https://api.content.tripadvisor.com/api/v1/location/locationId/details?language=fr&currency=EUR&locationId=locationId&key=apiKey';
const url =`https://api.content.tripadvisor.com/api/v1/location/search?language=fr&currency=EUR&key=${process.env.TRIPADVISOR_API_KEY}`;
const options = {method: 'GET', headers: {accept: 'application/json'}};

const getLocationId = async (req, res) => {
    fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
}

module.exports.getDrink = async(req, res) => {
    fetch(url1, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
}