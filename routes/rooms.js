// Importing the Express library
import express from "express";

// Importing functions from the room controller and the verifyAdmin middleware
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../Controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

// Creating an Express router
const router = express.Router();

// CREATE: Handling the POST request to create a new room for a specific hotel
router.post('/:hotelid', verifyAdmin, createRoom);

// UPDATE: Handling the PUT request to update the availability of a room by ID
router.put("/availability/:id", updateRoomAvailability);
// UPDATE: Handling the PUT request to update a room by ID
router.put("/:id", verifyAdmin, updateRoom);

// DELETE: Handling the DELETE request to delete a room by ID and hotel ID
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

// GET: Handling the GET request to retrieve a specific room by its ID
router.get('/:id', getRoom);

// GET ALL: Handling the GET request to retrieve all rooms
router.get('/', getRooms);

// Exporting the router to be used in other parts of the application
export default router;
