// Importing the Hotel model
import Hotel from '../models/Hotel.js';

// CREATE: Create a new hotel
export const createHotel = async (req, res, next) => {
    // Creating a new Hotel instance with data from the request body
    const newHotel = new Hotel(req.body);

    try {
        // Saving the new hotel to the database
        const savedHotel = await newHotel.save();

        // Sending a JSON response with the saved hotel details
        res.status(200).json(savedHotel);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// UPDATE: Update a hotel by ID
export const updateHotel = async (req, res, next) => {
    try {
        // Updating the hotel by its ID with new data from the request body
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        // Sending a JSON response with the updated hotel details
        res.status(200).json(updatedHotel);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// DELETE: Delete a hotel by ID
export const deleteHotel = async (req, res, next) => {
    try {
        // Deleting the hotel by its ID
        await Hotel.findByIdAndDelete(req.params.id);

        // Sending a JSON response indicating successful deletion
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// GET: Get a single hotel by ID
export const getHotel = async (req, res, next) => {
    try {
        // Finding and fetching a single hotel by its ID
        const hotel = await Hotel.findById(req.params.id);

        // Sending a JSON response with the found hotel details
        res.status(200).json(hotel);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// GET ALL: Get all hotels
export const getHotels = async (req, res, next) => {
    try {
        // Finding and fetching all hotels
        const hotels = await Hotel.find();

        // Sending a JSON response with an array of all hotels
        res.status(200).json(hotels);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};
