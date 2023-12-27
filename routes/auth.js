// Importing the Express library
import express from "express";

// Importing the login and register functions from the auth controller
import { login, register } from "../Controllers/auth.js";

// Creating an Express router
const router = express.Router();

// Handling the POST request for user registration
router.post('/register', register);

// Handling the POST request for user login
router.post('/login', login);

// Exporting the router to be used in other parts of the application
export default router;
