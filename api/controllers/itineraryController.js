// controllers/itineraryController.js

const Itinerary = require('../models/itineraryModel');

// CREATE a new itinerary
exports.createItinerary = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    req.body.user_id = userId;
    const itinerary = await Itinerary.create(req.body);
    res.status(201).json(itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ all itineraries for a given user
exports.getItineraries = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const itineraries = await Itinerary.find({ user_id: userId });
    res.status(200).json(itineraries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// READ a specific itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id);
    res.status(200).json(itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE an itinerary by ID
exports.updateItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(itinerary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE an itinerary by ID
exports.deleteItinerary = async (req, res) => {
  try {
    await Itinerary.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Itinerary deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

