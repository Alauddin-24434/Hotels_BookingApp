import user from "../models/user.js";




export const register = async ( req, res,next) => {
    try {
        const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        await newUser.save();
        res.status(200).send("User has been create successfully")
    } catch (err) {
        next(err)
    }
}