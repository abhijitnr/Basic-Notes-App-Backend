const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const authRoute = express.Router();
const bcrypt = require("bcrypt");

/* SIGNUP */
authRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const userPresent = await User.findOne({ email });

  if (userPresent?.email) {
    res.send("User already exist!");
  }
  try {
    bcrypt.hash(password, 5, async (err, encyptedpassword) => {
      const user = new User({ email, password: encyptedpassword });
      await user.save();
      res.send("Signup successfully");
    });
  } catch (error) {
    res.send(error);
  }
});

/* LOGIN */
authRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.find({ email });

    if (user.length > 0) {
      const hashed_password = user[0].password;

      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user[0]._id },
            process.env.JWT_TOKEN
          );
          res.send({ massege: "Login successfully", token: token });
        } else {
          res.send("Unable to Login!");
        }
      });
    } else {
      res.send("User not found!");
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = authRoute;
