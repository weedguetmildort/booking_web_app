require("dotenv").config();
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const {
  generateState,
  validateState,
} = require("../middlewares/stateValidation");

const router = express.Router();

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

module.exports = router;
