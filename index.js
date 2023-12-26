import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from './routes/auth.js'
import usersRoute from './routes/users.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
const app = express();

// dotenv config
dotenv.config()

// mongoose connected mongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            dbName: "Booking"
        });
        console.log("Connected to mongoDb")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDb disconnected")
})

//------------- middleware code start hare------------------------
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)

app.use((err, req, res, nex) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    // Check if the environment is set to 'production'
    if (process.env.NODE_ENV === "production") {
        return res.status(errorStatus).json({
            success: false,
            status: errorMessage,
            message: errorMessage,
        })
    } else {
        // In development or other environments, include the stack trace for debugging
        return res.status(errorStatus).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack
        })
    }
})

//----------------------middleware code end hare ---------------------



// basic setup code
app.listen(8000, () => {
    connect()
    console.log("Connected to backend.")
})