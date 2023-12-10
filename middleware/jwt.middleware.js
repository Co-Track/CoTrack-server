const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config({ path: __dirname + "/./../.env" });
const cors = require("cors");



// Instantiate the JWT token validation middleware
console.log(process.env.TOKEN_SECRET);
const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

// Function used to extract the JWT token from the request's 'Authorization' Headers
function getTokenFromHeaders(req) {
  // Check if the token is available on the request Headers
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Get the encoded token string and return it
    const token = req.headers.authorization.split(" ")[1];
    return token;
  }

  return null;
}
const app = express();
app.use(cors());
app.use("/auth", require("./routes/auth"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the middleware so that we can use it to create protected routes
module.exports = {
  isAuthenticated,
};
