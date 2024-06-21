// server.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./config/passport"); // Ensure you require the passport configuration

const authRoutes = require("./routes/auth");
const app = require("./app");

const PORT = process.env.PORT || 5005;

app.use(
  session({ secret: "your_secret_key", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
