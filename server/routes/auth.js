require("dotenv").config({ path: "../client/.env" });
const express = require("express");
const axios = require("axios");
const querystring = require("querystring");
const { requiredScopes } = require("express-oauth2-jwt-bearer");
const {
  generateToken,
  verifyToken,
} = require("../middlewares/stateValidation");
const CryptoJS = require("crypto-js");

// Encrypter
const encryptPassword = (password) => {
  const secretkey = process.env.REACT_DB_SECRET_KEY;
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    secretkey
  ).toString();
  return encryptedPassword;
};

// Decrypter
const decryptPassword = (encryptedPassword) => {
  const secretkey = process.env.REACT_APP_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const decryptPasswordDb = (encryptedPassword) => {
  const secretkey = process.env.REACT_DB_SECRET_KEY;
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, secretkey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const router = express.Router();

// Signup
router.post("/api/userSignup", async (req, res) => {
  try {
    const { email, password, firstName, lastName, zipCode } = req.body;

    const decryptedPassword = decryptPassword(password);
    const encryptedPassword = encryptPassword(decryptedPassword);

    // Create new user object
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      zip: zipCode,
      password: encryptedPassword,
    };

    // Save user to the database via another POST request
    const response = await axios.post(
      "http://localhost:5002/db/api/insertUser",
      newUser
    );

    if (response.status === 201) {
      // const savedUser = response.data;

      // Generate a token for the new user
      // const token = generateToken(savedUser);

      res.status(201).json({
        message: "User created successfully",
        // token,
        // user: {
        //   id: savedUser.id,
        //   email: savedUser.email,
        // },
      });
    } else {
      res.status(response.status).json(response.data);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login
router.post("/api/userLogin", async (req, res) => {
  // Simulating user login
  const { email, password } = req.body;
  const decryptedPassword = decryptPassword(password);

  try {
    // Make an axios call to get user data by username
    const response = await axios.post(
      "http://localhost:5002/db/api/getUserByEmail",
      { email }
    );

    if (!response.data.data || response.data.data.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = response.data.data[0];
    const storedPassword = user.password;
    const decryptedStoredPassword = decryptPasswordDb(storedPassword);

    if (decryptedPassword === decryptedStoredPassword) {
      const currUser = {
        id: user.uid,
        role: "user",
        firstName: user.firstname,
        lastName: user.lastname,
        zip: user.zip,
      };

      // Generate a JWT token
      const token = generateToken(currUser);

      // Return the user data and token
      res.status(201).json({ user: currUser, token: token });
    } else {
      return res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

// Check user token
router.post("/api/checkTokenUser", verifyToken("user"), (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

// Check partner token
router.post("/api/checkTokenPartner", verifyToken("partner"), (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

// Provide customer information
router.get("/api/user-profile", verifyToken("user"), (req, res) => {
  return res.json({ token, user });
});

// Update customer information
router.put("/api/user-profile", verifyToken("user"), (req, res) => {
  const userId = req.user.id;
  const { email, firstName, lastName } = req.body;

  // Update user information in the database
  User.findByIdAndUpdate(
    userId,
    { email, firstName, lastName },
    { new: true },
    (err, user) => {
      if (err) return res.status(500).send(err);
      res.json(user);
    }
  );
});

// Scope examples from previous implementation
router.get(
  "/api/private-scoped",
  verifyToken,
  requiredScopes("read:messages"),
  (req, res) => {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

// Signup
router.post("/api/partnerSignup", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      zipCode,
      isAdmin,
      businessName,
      category,
      address,
      state,
      city,
      aboutUs,
    } = req.body;

    var adminValue = 0;

    const decryptedPassword = decryptPassword(password);
    const encryptedPassword = encryptPassword(decryptedPassword);

    // Create new user object
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      zip: zipCode,
      password: encryptedPassword,
    };

    const newPartner = {
      businessName: businessName,
      category: category,
      email: email,
      address: address,
      state: state,
      zip: zipCode,
      city: city,
      aboutUs: aboutUs,
    };

    // Save user to the database via another POST request
    const response1 = await axios.post(
      "http://localhost:5002/db/api/insertUser",
      newUser
    );

    const result1 = response1.status;

    const response2 = await axios.post(
      "http://localhost:5002/db/api/insertPartner",
      newPartner
    );

    const result2 = response2.status;

    const response3 = await axios.post(
      "http://localhost:5002/db/api/getUserByEmail",
      { email }
    );

    const result3 = response3.data.data[0];

    const response4 = await axios.post(
      "http://localhost:5002/db/api/getPartnerByEmail",
      { email }
    );

    const result4 = response4.data.data[0];

    if (isAdmin) {
      adminValue = 1;
    }

    const response5 = await axios.post(
      "http://localhost:5002/db/api/makeUserPartner",
      {
        uID: result3.uid,
        pID: result4.pid,
        isAdmin: adminValue,
      }
    );

    const result5 = response5.status;

    if (result1 === 201 && result2 === 201 && result5 === 201) {
      res.status(201).json({
        message: "Partner creation is successfull",
      });
    } else {
      res
        .status(result1, result2, result5)
        .json(response1.data, response2.data, response5.data);
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Partner Login
router.post("/api/partnerLogin", async (req, res) => {
  // Simulating user login
  const { email, password } = req.body;
  const decryptedPassword = decryptPassword(password);

  try {
    // Make an axios call to get user data by username
    const response1 = await axios.post(
      "http://localhost:5002/db/api/getUserByEmail",
      { email }
    );

    if (!response1.data.data || response1.data.data.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = response1.data.data[0];
    const uid = user.uid;
    const storedPassword = user.password;
    const decryptedStoredPassword = decryptPasswordDb(storedPassword);

    const response2 = await axios.post(
      "http://localhost:5002/db/api/getPartnerByEmail",
      { email }
    );

    if (!response2.data.data || response2.data.data.length === 0) {
      return res.status(404).json({ message: "Not a partner" });
    }

    const partner = response2.data.data[0];
    const pid = partner.pid;

    const response3 = await axios.post(
      "http://localhost:5002/db/api/getPartnerAdmin",
      { uid }
    );

    const admin = response3.data.data[0];

    if (decryptedPassword === decryptedStoredPassword && admin.pid === pid) {
      const currUser = {
        id: user.uid,
        role: "partner",
        firstName: user.firstname,
        lastName: user.lastname,
        zip: user.zip,
      };

      // Generate a JWT token
      const token = generateToken(currUser);

      // Return the user data and token
      res.status(201).json({ user: currUser, token: token });
    } else {
      return res.status(403).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

module.exports = router;
