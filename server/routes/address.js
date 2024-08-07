require("dotenv").config({ path: "../client/.env" });

const express = require("express");

const jwt = require("jsonwebtoken");
const axios = require("axios");

const router = express.Router();

const domain = process.env.GOOGLE_API_ADDRESS_DOMAIN;
const api = process.env.GOOGLE_API_ADDRESS_API;
const apiKey = process.env.GOOGLE_API_ADDRESS_KEY;

// Check address
router.post("/api/checkAddress", async (req, res) => {
  const { street, city, state, zip } = req.body;

  const address = {
    regionCode: "US",
    addressLines: [street, city, state, zip],
  };

  try {
    const response = await axios.post(
      `https://${domain}/v1:${api}?key=${apiKey}`,
      { address }
    );

    res.json({
      data: {
        status: response.data.result.verdict.hasUnconfirmedComponents,
        street:
          response.data.result.uspsData.standardizedAddress.firstAddressLine,
        city: response.data.result.uspsData.standardizedAddress.city,
        state: response.data.result.uspsData.standardizedAddress.state,
        zip: response.data.result.uspsData.standardizedAddress.zipCode,
      },
    });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({
        error: error.response.data,
      });
    } else if (error.request) {
      res.status(500).json({
        message: "No response received from the server",
        error: error.message,
      });
    } else {
      res.status(500).json({
        message: "Error in setting up the request",
        error: error.message,
      });
    }
  }
});

module.exports = router;
