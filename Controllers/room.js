// Importing the Hotel and Room models
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

// CREATE: Create a new room and associate it with a hotel
export const createRoom = async (req, res, next) => {
    // Extracting hotelId from the request parameters
    const hotelId = req.params.hotelid;

    // Creating a new Room instance with data from the request body
    const newRoom = new Room(req.body);

    try {
        // Saving the new room to the database
        const savedRoom = await newRoom.save();

        // Updating the Hotel document to include the new room's ID
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
            });
        } catch (err) {
            next(err);
        }

        // Sending a JSON response with the saved room details
        res.status(200).json(savedRoom);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// UPDATE: Update a room by ID
export const updateRoom = async (req, res, next) => {
    try {
        // Updating the room by its ID with new data from the request body
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        // Sending a JSON response with the updated room details
        res.status(200).json(updatedRoom);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// UPDATE: Update room availability by adding unavailable dates
export const updateRoomAvailability = async (req, res, next) => {
    try {
        // Updating room availability by adding unavailable dates
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates,
                },
            }
        );

        // Sending a JSON response indicating successful update
        res.status(200).json("Room status has been updated");
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// DELETE: Delete a room by ID
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        // Deleting the room by its ID
        await Room.findByIdAndDelete(req.params.id);

        try {
            // Removing the room ID from the associated hotel's rooms array
            await Hotel.findByIdAndUpdate(hotelId, {
                $pull: { rooms: req.params.id },
            });
        } catch (err) {
            next(err);
        }

        // Sending a JSON response indicating successful deletion
        res.status(200).json("Room has been deleted");
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// GET: Get a single room by ID
export const getRoom = async (req, res, next) => {
    try {
        // Finding and fetching a single room by its ID
        const foundRoom = await Room.findById(req.params.id);

        // Sending a JSON response with the found room details
        res.status(200).json(foundRoom);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};

// GET ALL: Get all rooms
export const getRooms = async (req, res, next) => {
    try {
        // Finding and fetching all rooms
        const allRooms = await Room.find();

        // Sending a JSON response with an array of all rooms
        res.status(200).json(allRooms);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
};
