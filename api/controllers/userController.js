const UserModel = require('../models/userModel');


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

module.exports = {
    saveEventFavorites,
    getEventFavorites,
};