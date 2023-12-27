// Importing necessary modules
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import cookieParser from "cookie-parser";

// Creating an instance of the Express application
const app = express();

// Loading environment variables from a .env file
dotenv.config();

// Connecting to MongoDB using Mongoose
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            dbName: "Booking"
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
};

// Handling MongoDB disconnection event
mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

// Middleware section
app.use(express.json()); // Parsing JSON requests
app.use(cookieParser()); // Parsing cookies
app.use('/api/auth', authRoute); // Routes for authentication
app.use('/api/users', usersRoute); // Routes for user management
app.use('/api/hotels', hotelsRoute); // Routes for hotels
app.use('/api/rooms', roomsRoute); // Routes for rooms

// Error handling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    // Check if the environment is set to 'production'
    if (process.env.NODE_ENV === "production") {
        return res.status(errorStatus).json({
            success: false,
            status: errorMessage,
            message: errorMessage,
        });
    } else {
        // In development or other environments, include the stack trace for debugging
        return res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack
        });
    }
});

// Basic setup code - Starting the Express server
app.listen(8000, () => {
    connect(); // Connect to MongoDB
    console.log("Connected to the backend.");
});
