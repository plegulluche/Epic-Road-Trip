const express = require("express");
const fetch = require("node-fetch");
const request = require("request");
const { response } = require("../app");

const getTravelByLocation = async (req, res) => {

    let params = req.query;
    console.log("params from travel controller", params);
    //coordinates of origin
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${params.origin}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            return Promise.resolve(response.results[0].geometry.location);
        })
    //coordinates of destination
    //direction between origin and destination
};
