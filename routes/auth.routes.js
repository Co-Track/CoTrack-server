const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Google OAuth Client configuration
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Route for initiating Google OAuth login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Callback route after successful Google OAuth login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, generate a JWT token.
    const token = jwt.sign({ user: req.user }, process.env.TOKEN_SECRET, {
      expiresIn: "6h", // Example: Token expires in 6 hours
    });
    // Redirect to frontend with token in query parameter
    res.redirect(`${process.env.ORIGIN}/auth/success?token=${token}`);
  }
);

// POST /auth/signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name } = req.body;

  // Check if email or password or name are provided as empty strings
  if (email === "" || password === "" || name === "") {
    res.status(400).json({ message: "Provide email, password and name" });
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: "Provide a valid email address." });
    return;
  }

  // Validate password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  // Check if the user with the same email already exists
  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "User already exists." });
        return;
      }

      // Create hashed password
      const hashedPassword = bcrypt.hashSync(password, saltRounds);

      // Create new user
      return User.create({ email, password: hashedPassword, name });
    })
    .then((createdUser) => {
      const { email, name, _id } = createdUser;
      const user = { email, name, _id };
      res.status(201).json({ user });
    })
    .catch((err) => next(err));
});

// POST  /auth/login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Find user by email
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare passwords
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Create JWT token
        const payload = {
          _id: foundUser._id,
          email: foundUser.email,
          name: foundUser.name,
        };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          expiresIn: "6h",
        });
        res.status(200).json({ authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => next(err));
});

// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.payload);
});

module.exports = router;
