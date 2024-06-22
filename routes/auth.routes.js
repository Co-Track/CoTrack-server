const express = require("express");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const router = express.Router();
const User = require("../models/User.model");

const client = new OAuth2Client(
  "254377218393-77l212k5736ue5c9d2k4i1p226cu7jbv.apps.googleusercontent.com"
); // Replace with your Google Client ID

router.post("/auth/google-login", async (req, res) => {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience:
        "254377218393-77l212k5736ue5c9d2k4i1p226cu7jbv.apps.googleusercontent.com", // Replace with your Google Client ID
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name, googleId });
      await user.save();
    }

    const payload = { _id: user._id, email: user.email, name: user.name };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });

    res.status(200).json({ authToken });
  } catch (error) {
    res.status(401).json({ message: "Google login failed", error });
  }
});

module.exports = router;
