const express = require("express");
const axios = require("axios");


// get coord of a place from google api
// takes a string as input and returns an object with lat and lng
exports.getLocation = async (req, res) => {
    let location = req.body.location;
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?&address=${location}&key=${process.env.GOOGLE_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};
