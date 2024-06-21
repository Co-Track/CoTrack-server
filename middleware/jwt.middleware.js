const { expressjwt: jwt } = require("express-jwt");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const isAuthenticated = jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ["HS256"],
  requestProperty: "payload",
  getToken: getTokenFromHeaders,
});

const verifyGoogleToken = async (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    req.payload = payload; // Add Google payload to request object if needed

    next();
  } catch (error) {
    console.error("Google token verification error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

function getTokenFromHeaders(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

module.exports = {
  isAuthenticated,
  verifyGoogleToken,
};
