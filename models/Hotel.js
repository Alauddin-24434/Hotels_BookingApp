// Importing the mongoose library
import mongoose from 'mongoose';

// Defining the HotelSchema using mongoose.Schema
const HotelSchema = new mongoose.Schema({
    // Name of the hotel (String), required field
    name: {
        type: String,
        required: true
    },
    // Type of the hotel (String), required field
    type: {
        type: String,
        required: true
    },
    // City where the hotel is located (String), required field
    city: {
        type: String,
        required: true
    },
    // Address of the hotel (String), required field
    address: {
        type: String,
        required: true
    },
    // Title of the hotel (String), required field
    title: {
        type: String,
        required: true
    },
    // Distance of the hotel from a certain point (String), required field
    distance: {
        type: String,
        required: true
    },
    // Photos of the hotel (Array of Strings)
    photos: {
        type: [String],
    },
    // Description of the hotel (String), required field
    desc: {
        type: String,
        required: true
    },
    // Rating of the hotel (Number) with a minimum of 0 and a maximum of 5
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    // Rooms available in the hotel (Array of Strings), required field
    rooms: {
        type: [String],
        required: true
    },
    // Cheapest price for a room in the hotel (Number), required field
    cheapestPrice: {
        type: Number,
        required: true
    },
    // Featured status of the hotel (Boolean), default is false
    featured: {
        type: Boolean,
        default: false
    },
});

// Creating and exporting the Hotel model using the HotelSchema
export default mongoose.model('Hotel', HotelSchema);
