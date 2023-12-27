// Importing the mongoose library
import mongoose from 'mongoose';

// Defining the UserSchema using mongoose.Schema
const UserSchema = new mongoose.Schema({
    // Username of the user (String), required and unique field
    username: {
        type: String,
        required: true,
        unique: true,
    },
    // Email of the user (String), required and unique field
    email: {
        type: String,
        required: true,
        unique: true,
    },
    // Password of the user (String), required field
    password: {
        type: String,
        required: true,
    },
    // isAdmin flag indicating whether the user is an admin or not (Boolean), default is false
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    // Adding timestamps for 'createdAt' and 'updatedAt'
    timestamps: true,
});

// Creating and exporting the User model using the UserSchema
export default mongoose.model('User', UserSchema);
