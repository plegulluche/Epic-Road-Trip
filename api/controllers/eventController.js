const SavedEvent = require('../models/savedEventModel');
const UserModel = require('../models/userModel');
const axios = require('axios');
require('dotenv').config();
const nodeFetch = require('node-fetch');
const phq = require('predicthq');
const { Client } = require('@googlemaps/google-maps-services-js');
const googleClient = new Client({});

const googleApiKey = process.env.GOOGLE_API_KEY;

const geocodeAddress = async (address) => {
    const response = await googleClient.geocode({
        params: {
            address,
            key: googleApiKey,
        },
    });

    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
};

// Initialises PredictHQ client library using your access token
// Note: You can find/create your access token at https://control.predicthq.com/clients
const client = new phq.Client({access_token: process.env.PREDICTHQ_API_KEY, fetch: nodeFetch});

// Use the events endpoint
const phqEvents = client.events;

const getEvents = async (req, res) => {
    console.log(req.query)
    const { radius } = req.query;
    
    let Latitude, Longitude;
    if (req.query.location) {
        const { lat, lng } = await geocodeAddress(req.query.location);
        Latitude = lat;
        Longitude = lng;
    }
    else if (req.query.lat && req.query.lng) {
        const { lat, lng } = req.query;
        Latitude = lat;
        Longitude = lng;
    }


    delete req.query.location;
    delete req.query.radius;
    delete req.query.lat;
    delete req.query.lng;
    
    //construct within query
    if(Latitude && Longitude) {
        const within = `${radius ?? 500}m@${Latitude},${Longitude}`;
        // add within to req.query
        req.query.within = within;
    }
    console.log("reeeeeeeeeeee",req.query)
    
    try {
        const data = await phqEvents.search(req.query)
            .then(
                (results) => {
                    return results;
                }
            ).catch(
                err => console.error(err)
            );
        //if res is empty, return data
        if(res === undefined)
            return data;
    
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
        });
    }
};

const saveEvent = async (req, res) => {
    const { _id: userId } = req.user;
    const { event } = req.body;

    try {
        const newEvent = new SavedEvent(event);
        newEvent.user = userId;
        await newEvent.save();

        res.status(200).json({
            success: true,
            newEvent: newEvent,
            message: 'Event saved successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to save event',
        });
    }
}

const getSavedEventsByUser = async (req, res) => {
    const { _id: userId } = req.user;
    try {
        const events = await SavedEvent
            .find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            events: events,
            message: 'Events fetched successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch events',
        });
    }
};

const recommendEvents = async (req, res) => {
    const { lat, lng, location } = req.query;
    const { _id: userId } = req.user;
        
    //fetch user, if user has eventFavorites
    //fetch events based on eventFavorites

    const user = await UserModel.findById(userId);
    let userFavorites;

    if(user.eventFavorites !== "" && user.eventFavorites !== undefined) {
        userFavorites = user.eventFavorites;
    }

    try {
        // Fetch popular events by local rank
        const popularEvents = await getEvents({
            query: {
                lat,
                lng,
                location,
                category: userFavorites ?? "community,concerts,conferences,festivals,performing-arts,sports,expos",
                radius: 1000, // Search within 5km
                sort: '-local_rank',
                limit: 5, // Limit the number of events returned
            },
        });

        // Fetch events based on the current time, format is YYYY-MM-DD
        const currentTime = new Date().toISOString().split('T')[0];
        const timeBasedEvents = await getEvents({
            query: {
                lat,
                lng,
                location,
                category: userFavorites ?? "community,concerts,conferences,festivals,performing-arts,sports,expos",
                radius: 1000, // Search within 5km
                'start_around.origin': currentTime,
                'start_around.offset' : '1d', // Events starting within 1 day
                limit: 5, // Limit the number of events returned
            },
        });

        // Combine popular and time-based events and remove duplicates
        const recommendedEvents = [...popularEvents, ...timeBasedEvents].filter((event, index, self) =>
            index === self.findIndex((e) => e.id === event.id)
        );

        return res.status(200).json(recommendedEvents);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch recommended events',
        });
    }
};

module.exports = {
    getEvents,
    saveEvent,
    getSavedEventsByUser,
    recommendEvents
};




