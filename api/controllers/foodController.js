const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const dotenv = require("dotenv");
const Amadeus = require('amadeus');


module.exports.getFoodData = async (req, res) => {
    const amadeus = new Amadeus({
        clientId: process.env.AMADEUS_API_KEY,
        clientSecret: process.env.AMADEUS_SECRET
      });

    let params = req.query;

    if (params.adress != ''){
      //conversion en coordonnées puis requete pour avoir les activités alentour
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params.adress}&key=${process.env.GOOGLE_API_KEY}`)
          .then(response => response.json())
          .then(response => {
            return Promise.resolve(response.results[0].geometry.location)
          })
          .then(function(response){
            amadeus.shopping.activities.get(
                {
                  latitude: response.lat,
                  longitude: response.lng,
                  radius: params.radius
                }
            ).then(function(resp){
              res.send(resp.data);
            }).catch(function(respError){
              res.send(respError);
            });
          })
      }
      else{
        amadeus.shopping.activities.get(
            {
              latitude: params.lat,
              longitude: params.lng,
              radius: params.radius
            }
        ).then(function(resp){
          res.send(resp.data);
        }).catch(function(respError){
          res.send(respError);
        });
      }

};