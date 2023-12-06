const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { isAuthenticated } = require("./middleware/jwt.middleware");
require("dotenv").config();

mongoose
  .connect("mongodb://127.0.0.1:27017/CoTrack-backend")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB ", err));

const app = express();

require("./config")(app);

app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// 👇 Start handling routes here
app.use("/api", require("./routes/index.routes"));
app.use("/api", isAuthenticated, require("./routes/Living.routes"));
app.use("/api", isAuthenticated, require("./routes/Personal.routes"));
app.use("/api", isAuthenticated, require("./routes/Emergency.routes"));
app.use("/auth", require("./routes/auth.routes"));

require("./error-handling")(app);

//app.use(errorHandler);

// START SERVER
module.exports = app;
