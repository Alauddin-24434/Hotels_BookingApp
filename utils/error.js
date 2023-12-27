// Function to create an error object
export const createError = (status, message) => {
    // Creating a new Error object
    const err = new Error();

    // Setting the status and message properties of the error object
    err.status = status;
    err.message = message;

    // Returning the created error object
    return err;
};
