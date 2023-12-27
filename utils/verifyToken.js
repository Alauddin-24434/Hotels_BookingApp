import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// Middleware to verify the presence and validity of a token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  // If no token is present, return a 401 Unauthorized error
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  // Verify the token using the secret key
  jwt.verify(token, process.env.JWT, (err, user) => {
    // If an error occurs during verification, return a 403 Forbidden error
    if (err) return next(createError(403, "Token is not valid!"));

    // If verification is successful, attach the user information to the request object
    req.user = user;

    // Move on to the next middleware
    next();
  });
};

// Middleware to verify that the user is authorized (matches the user ID or is an admin)
export const verifyUser = (req, res, next) => {
  // Use the verifyToken middleware to check authentication
  verifyToken(req, res, () => {
    // Check if the authenticated user ID matches the requested user ID or if the user is an admin
    if (req.user.id === req.params.id || req.user.isAdmin) {
      // If authorized, move on to the next middleware
      next();
    } else {
      // If not authorized, return a 403 Forbidden error
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// Middleware to verify that the user is an admin
export const verifyAdmin = (req, res, next) => {
  // Use the verifyToken middleware to check authentication
  verifyToken(req, res, () => {
    // Check if the authenticated user is an admin
    if (req.user.isAdmin) {
      // If an admin, move on to the next middleware
      next();
    } else {
      // If not an admin, return a 403 Forbidden error
      return next(createError(403, "You are not authorized!"));
    }
  });
};
