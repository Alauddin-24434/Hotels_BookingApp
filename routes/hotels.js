// Importing the Express library
import express from "express";

// Importing functions from the hotel controller and the verifyAdmin middleware
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../Controllers/hotel.js";
import { verifyAdmin } from "../utils/verifyToken.js";

// Creating an Express router
const router = express.Router();

// CREATE: Handling the POST request to create a new hotel
router.post('/', verifyAdmin, createHotel);

// UPDATE: Handling the PUT request to update a hotel by ID
router.put('/:id', verifyAdmin, updateHotel);

// DELETE: Handling the DELETE request to delete a hotel by ID
router.delete('/:id', verifyAdmin, deleteHotel);

// GET: Handling the GET request to get a hotel by ID
router.get('/:id', getHotel);

// GET ALL: Handling the GET request to get all hotels
router.get('/', getHotels);

// Exporting the router to be used in other parts of the application
export default router;
