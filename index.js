import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose"
const app = express();
dotenv.config()

const connect= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDb")
      } catch (error) {
       throw error
      }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDb disconnected")
})

app.listen(8000, () => {
    connect()
    console.log("Connected to backend.")
})