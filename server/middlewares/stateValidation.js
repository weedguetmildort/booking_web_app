require("dotenv").config({ path: "../.env" });

const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const secretkey = process.env.JWT_SECRET;

// TOKEN GENERATION
function generateToken(user) {
  // The user object could contain fields like id, email, etc.
  const payload = {
    id: user.id,
    role: user.role,
  };

  // Options for the token
  const options = {
    expiresIn: "1h", // Token expires in 1 hour
  };

  // Sign the token
  const token = jwt.sign(payload, secretkey, options);
  return token;
}

// Middleware to check token
function verifyToken(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, secretkey, (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token" });
      }

      if (user.role !== requiredRole) {
        return res.status(403).json({ message: "Insufficient role" });
      }

      req.user = user;
      next();
    });
  };
}

function checkToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, secretkey, (err, user) => {
    if (err) {
      console.error("Token verification failed:", err);
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = user;
    next();
  });
}

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
  generateToken,
  verifyToken,
  checkToken,
  generateState,
  validateState,
};
