// Importing the User model
import User from '../models/userSchema.js';

// UPDATE: Update a user by ID
export const updateUser = async (req, res, next) => {
    try {
        // Updating the user by its ID with new data from the request body
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );

        // Sending a JSON response with the updated user details
        res.status(200).json(updatedUser);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
}

// DELETE: Delete a user by ID
export const deleteUser = async (req, res, next) => {
    try {
        // Deleting the user by its ID
        await User.findByIdAndDelete(req.params.id);

        // Sending a JSON response indicating successful deletion
        res.status(200).json("User has been deleted");
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
}

// GET: Get a single user by ID
export const getUser = async (req, res, next) => {
    try {
        // Finding and fetching a single user by its ID
        const user = await User.findById(req.params.id);

        // Sending a JSON response with the found user details
        res.status(200).json(user);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
}

// GET ALL: Get all users
export const getUsers = async (req, res, next) => {
    try {
        // Finding and fetching all users
        const users = await User.find();

        // Sending a JSON response with an array of all users
        res.status(200).json(users);
    } catch (err) {
        // Handling errors by passing them to the next middleware
        next(err);
    }
}
