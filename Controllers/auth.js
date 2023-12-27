// Importing the User model
import User from "../models/userSchema.js";

// Importing necessary modules
import bcrypt from 'bcryptjs'
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'

// REGISTER: Register a new user
export const register = async (req, res, next) => {
    try {
        // Generate a salt and hash the user's password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // Create a new User instance with data from the request body
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(200).send("User has been created successfully");
    } catch (err) {
        // Handle errors by passing them to the next middleware
        next(err);
    }
};

// LOGIN: Authenticate a user and generate a JWT token
export const login = async (req, res, next) => {
    try {
        // Attempt to find a user with the provided username in the database
        const user = await User.findOne({ username: req.body.username });

        // If no user is found, return a 404 error with the message "User not found"
        if (!user) {
            return next(createError(404, "User not found"));
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        // If the password is incorrect, return a 404 error with the message "Wrong password or username"
        if (!isPasswordCorrect) {
            return next(createError(404, "Wrong password or username"));
        }

        // Generate a JWT token containing user details
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        // If the username and password are correct, extract relevant details from the user object
        const { password, isAdmin, ...otherDetails } = user._doc;

        // Set the JWT token as an HTTP-only cookie
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            // Send a JSON response with the extracted user details (excluding password and isAdmin)
            .json({ ...otherDetails });
    } catch (err) {
        // If an error occurs during the login process, pass the error to the next middleware
        next(err);
    }
};
