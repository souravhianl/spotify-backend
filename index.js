const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require("./routes/Auth")

require('dotenv').config();

const app = express();
const port = 8090

app.use(express.json());

mongoose.connect("mongodb+srv://souravhianl:" +
    process.env.MONGO_PASSWORD +
    "@cluster0.1ica5fa.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((x) => {
        console.log("Connected to MONGO!")
    }).catch((err) => {
        console.log("Not connected")
    })

//Set-up passport jwt

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get('/', (req, res) => {
    res.send("HELLO TO THE APP")
})

app.use("/auth", authRoutes)

app.listen(port, () => {
    console.log("Server running on port " + port)
})