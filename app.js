// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

require("./config")(app);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

// 👇 Start handling routes here
app.use("/auth", require("./routes/auth.routes"));
app.use("/api", require("./routes/index.routes"));
app.use("/", require("./routes/Living.routes"));
app.use("/", require("./routes/Personal.routes"));
app.use("/", require("./routes/Emergency.routes"));

require("./error-handling")(app);

//app.use(errorHandler);

// START SERVER
module.exports = app;
