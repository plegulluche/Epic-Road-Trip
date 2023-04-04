const UserModel = require('../models/userModel');
const {geocodeAddress} = require('../utils/maps.utils');

const saveEventFavorites = async (req, res) => {
    try {
        // Assuming the user ID is available in req.user._id
        const { _id: userId } = req.user;
        const { eventFavorites } = req.body;
        //get user, update eventFavorites, save user
        const user = await UserModel.findById(userId);
        user.eventFavorites = eventFavorites;
        await user.save();

        res.status(200).json({ message: 'Event favorites saved successfully!', eventFavorites });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving event favorites.' });
    }
};

const getEventFavorites = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ eventFavorites: user.eventFavorites });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching event favorites.' });
    }
};

const saveAddress = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { address } = req.body;
        const { lat, lng } = await geocodeAddress(address);
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.address.text = address;
        user.address.coordinates.lat = lat;
        user.address.coordinates.lng = lng;
        await user.save();

        res.status(200).json({ message: 'Address saved successfully!', address });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving address.' });
    }
};

const getAddress = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json({ address: user.address });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching address.' });
    }
};

const saveProfile = async (req, res) => {
    try {
        const { _id: userId } = req.user;
        const { favoriteDestination } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.favoriteDestination = favoriteDestination;
        await user.save();

        res.status(200).json({ message: 'Profile saved successfully!', favoriteDestination });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while saving profile.' });
    }
};

const getProfile = async (req, res) => {
    try {
        const { _id: userId } = req.user;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        //remove password from response
        delete user.password;
        res.status(200).json({ user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching profile.' });
    }
};




module.exports = {
    saveEventFavorites,
    getEventFavorites,
    saveAddress,
    getAddress,
    saveProfile,
    getProfile
};