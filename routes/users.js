// Importing the Express library
import express from "express";

// Importing functions from the user controller and verifyToken middleware
import { deleteUser, getUser, getUsers, updateUser } from "../Controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

// Creating an Express router
const router = express.Router();

// UPDATE: Handling the PUT request to update a user by ID
router.put('/:id', verifyUser, updateUser);

// DELETE: Handling the DELETE request to delete a user by ID
router.delete('/:id', verifyUser, deleteUser);

// GET: Handling the GET request to retrieve a specific user by ID
router.get('/:id', verifyUser, getUser);

// GET ALL: Handling the GET request to retrieve all users. Requires admin authorization.
router.get('/', verifyAdmin, getUsers);

// Exporting the router to be used in other parts of the application
export default router;
