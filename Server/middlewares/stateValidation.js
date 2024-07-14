const crypto = require("crypto");
const { auth } = require("express-oauth2-jwt-bearer");

// Middleware to check JWT
const checkJwt = auth({
  audience: "https://booking-web-app-api/",
  issuerBaseURL: "https://dev-o5ogeizt5ue5oi0r.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

function generateState(req, res, next) {
  const state = crypto.randomBytes(16).toString("hex");
  req.session.state = state;
  req.state = state; // Pass state to the next middleware
  next();
}

function validateState(req, res, next) {
  const { state } = req.query;
  if (state !== req.session.state) {
    return res.status(400).send("Invalid state parameter");
  }
  delete req.session.state; // Clear state parameter from session
  next();
}

module.exports = {
  checkJwt,
  generateState,
  validateState,
};
