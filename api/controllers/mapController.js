const express = require("express");
const axios = require("axios");


//Improve : add a function to get the location from the user's IP address
//          add a function to get the location from the user's browser
//          add a function to parse the variables send and make the exports 
//              functions a normal function and a callback that call those function and return a json

// get coord of a place from google api
// takes a string as input and returns an object with lat and lng
module.exports.getLocation = async (req, res) => {
    let location = req.body.location;
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${location}&key=${process.env.GOOGLE_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

// reversed goecoding
// takes a lat and lng as input and returns an object with address
module.exports.getAddress = async (req, res) => {
    let lat = req.body.lat;
    let lng = req.body.lng;
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}
