const Restaurant = require('../models/Restaurant');


exports.createRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, rating } = req.body;
    if (!name || !location || !cuisine) {
      return res.status(400).json({ error: 'Name, location, and cuisine are required.' });
    }
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5.' });
    }
    const newRestaurant = new Restaurant({ name, location, cuisine, rating });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while creating the restaurant.' });
  }
};

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({ isDeleted: false });
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving restaurants.' });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id, isDeleted: false });
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the restaurant.' });
  }
};


exports.updateRestaurant = async (req, res) => {
  try {
    const { name, location, cuisine, rating } = req.body;
    if (rating !== undefined && (rating < 0 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 0 and 5.' });
    }
    const updatedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { name, location, cuisine, rating },
      { new: true, runValidators: true }
    );
    if (!updatedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found or already deleted.' });
    }
    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the restaurant.' });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const deletedRestaurant = await Restaurant.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!deletedRestaurant) {
      return res.status(404).json({ error: 'Restaurant not found or already deleted.' });
    }
    res.status(200).json({ message: 'Restaurant deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the restaurant.' });
  }
};
