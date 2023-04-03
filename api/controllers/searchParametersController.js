// controllers/searchParametersController.js

const SearchParameters = require('../models/searchParameters');

const saveSearchParameters = async (req, res) => {
    try {
      // Assuming the user ID is available in req.user._id
      const { _id: userId } = req.user;
      const searchParameters = new SearchParameters({ ...req.query, user: userId });
      await searchParameters.save();
  
      res.status(200).json({ message: 'Search parameters saved successfully!', searchParameters });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while saving search parameters.' });
    }
  };

  const getSearchParameters = async (req, res) => {
    try {
      const { _id: userId } = req.user;
      const searchParameters = await SearchParameters.getByUserId(userId);
  
      if (!searchParameters) {
        return res.status(404).json({ message: 'Search parameters not found.' });
      }
  
      res.status(200).json({ searchParameters });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching search parameters.' });
    }
  };

module.exports = {
  saveSearchParameters,
    getSearchParameters,
};
