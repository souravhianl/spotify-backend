const express = require("express")
const router = express.Router();
const User = require("../models/User")
const { getToken } = require("../utils/helper")

router.post("/register", async (res, req) => {

    const { email, password, firstName, lastName, username } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        return res
            .status(403)
            .json({ error: "A user with this email already exists" })
    }

    //If user not found create a new user and store it in DB
    //We do not store password in plain text
    //We convert plain text password to a hash
    const hashedPassword = bcrypt.hash(password, 10);
    const newUserData = { email, password: hashedPassword, firstName, lastName, username };
    const newUser = await User.create(newUserData);

    //We want to create a token to return to the user
    const token = await getToken(email, newUser);

    //return the result to the user

    const userToReturn = { ...newUser.toJSON(), token }

    delete userToReturn.password;
    return res.status(200).json(userToReturn);


})

module.exports = router;