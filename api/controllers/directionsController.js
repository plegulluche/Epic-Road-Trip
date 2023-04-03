const axios = require('axios');
const Direction = require('../models/directionsModel');

const getRouteCoordinates = async (req, res) => {
    const { origin, destination, waypoints } = req.body;
    const { _id: userId } = req.user;
    //if waypoints is empty, remove it from the request body
    let waypointsArray = req.body.waypoints;
    if (waypointsArray.length === 0) {
        delete req.body.waypoints;
    }
    const coordinates = [origin, ...waypointsArray, destination].map((coord) => {
        if (Array.isArray(coord)) {
            return coord.reverse();
        } else {
            return [coord.lng, coord.lat];
        }
    });
    try {
        const response = await axios.post(
            `https://api.openrouteservice.org/v2/directions/driving-car`,
            {
                coordinates: coordinates,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: process.env.ORS_API_KEY,
                },
            }
        );

        const data = response.data;
        // Save the fetched data to MongoDB
        const newDirection = new Direction(data);
        newDirection.user = userId;
        await newDirection.save();

        res.status(200).json({
            success: true,
            newDirection: newDirection,
            message: 'Route coordinates fetched successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch route coordinates',
        });
    }
};

const getDirectionsHistoryByUser = async (req, res) => {
    const { _id: userId } = req.user;
    try {
        const directions = await Direction
            .find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(10);
            
        res.status(200).json({
            success: true,
            directions: directions,
            message: 'Directions fetched successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch directions',
        });
    }
};

const getSavedDirectionsByUser = async (req, res) => {
    const { _id: userId } = req.user;
    try {
        const directions = await Direction
            .find({ user: userId, isSaved: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            directions: directions,
            message: 'Directions fetched successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch directions',
        });
    }
};


module.exports = {
    getRouteCoordinates,
    getDirectionsHistoryByUser,
    getSavedDirectionsByUser
};