require("dotenv").config({ path: "../.env" });
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const {
  checkJwt,
  generateState,
  validateState,
} = require("../middlewares/stateValidation");
const CryptoJS = require("crypto-js");

const decryptPassword = (encryptedPassword) => {
  const secretkey = process.env.SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const router = express.Router();

// EXAMPLES
// This route doesn't need authentication
router.get("/api/public", (req, res) => {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
router.get("/api/private", checkJwt, (req, res) => {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

router.get(
  "/api/private-scoped",
  checkJwt,
  requiredScopes("read:messages"),
  (req, res) => {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

// NEW API CALLS
// Sign Up -- Might move to modular auth file after testing
router.post("/signup", async (req, res) => {
  const {
    client_id,
    email,
    password,
    connection,
    username,
    given_name,
    family_name,
    name,
    nickname,
    picture,
    user_metadata,
  } = req.body;

  try {
    const response = await axios.post(
      `https://dev-o5ogeizt5ue5oi0r.us.auth0.com/dbconnections/signup`,
      {
        client_id: client_id,
        email: email,
        password: password,
        connection: connection,
        username: username,
        given_name: given_name,
        family_name: family_name,
        name: name,
        nickname: nickname,
        picture: picture,
        user_metadata: user_metadata,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      message: "User successfully signed up!",
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json({
        message: "Error signing up user",
        error: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({
        message: "No response received from the server",
        error: error.message,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({
        message: "Error in setting up the request",
        error: error.message,
      });
    }
  }
});

router.get("/login", generateState, (req, res) => {
  const authUrl =
    `https://${process.env.AUTH0_DOMAIN}/authorize?` +
    querystring.stringify({
      response_type: "code",
      client_id: process.env.AUTH0_CLIENT_ID,
      connection: process.env.AUTH0_CONNECTION,
      redirect_uri: process.env.AUTH0_CALLBACK_URL,
      scope: "openid profile email",
      state: req.state, // Use the generated state
    });

  res.redirect(authUrl);
});

router.get("/callback", validateState, async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "authorization_code",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: code,
        redirect_uri: process.env.AUTH0_CALLBACK_URL,
      }
    );

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get(
      `https://${process.env.AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const user = userResponse.data;

    // Save user information in session or database, then redirect
    // req.session.user = user; // if using session
    res.json(user); // For now, just return the user information
  } catch (error) {
    console.error(error);
    res.status(500).send("Authentication failed");
  }
});

router.post("/quick-login", async (req, res) => {
  const { email, password } = req.body;
  const decryptedPassword = decryptPassword(password);

  // const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const response = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        grant_type: "password",
        username: email,
        password: decryptedPassword,
        audience: process.env.AUTH0_AUDIENCE,
        scope: "openid profile email",
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        connection: process.env.AUTH0_CONNECTION,
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response.data);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

module.exports = router;
