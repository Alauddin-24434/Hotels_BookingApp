// Importing the mongoose library
import mongoose from 'mongoose';

// Defining the RoomSchema using mongoose.Schema
const RoomSchema = new mongoose.Schema({
    // Title of the room (String), required field
    title: {
        type: String,
        required: true,
    },
    // Price of the room (Number), required field
    price: {
        type: Number,
        required: true,
    },
    // Maximum number of people allowed in the room (Number), required field
    maxPeople: {
        type: Number,
        required: true,
    },
    // Description of the room (String), default is false
    desc: {
        type: String,
        default: false,
    },
    // Room numbers and their unavailable dates (Array of Objects)
    roomNumbers: [
        {
            number: Number,
            unavailableDates: {
                type: [Date],
            },
        },
    ],
}, {
    // Adding timestamps for 'createdAt' and 'updatedAt'
    timestamps: true,
});

// Creating and exporting the Room model using the RoomSchema
export default mongoose.model('Room', RoomSchema);
