import User from "../models/User.js"
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {

    try {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hash,
        })

        await newUser.save()
        res.status(200).send("User has been created.")
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {

    try {

        const user = await User.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found!"))


        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(404, "Invalid Ceredential!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,            // Required for SameSite=None
            sameSite: "None",
        }).status(200).send({ details: { ...otherDetails }, isAdmin })
    } catch (error) {
        next(error)
    }
}