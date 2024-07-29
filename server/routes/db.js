require("dotenv").config({ path: "../.env" });

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbService = require("../middlewares/dbService");

//
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Might need to remove
// connection.connect((err) => {
//   if (err) {
//     console.log(err.message);
//   }
// });

// Test API call
router.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

// Test DB Call
router.get("/api/users", (req, res) => {
  connection.connect();

  connection.query("SELECT * from Users", (err, result) => {
    if (err) throw err;

    res.json(result);
  });
  connection.end();
});

// Test Insert User
router.post("/api/insertuser", (req, res) => {
  var username = req.body.username;
  var password = req.body.encryptedPassword;
  var firstname = req.body.firstName;
  var lastname = req.body.lastName;
  var email = req.body.email;
  var isPartner = req.body.isPartner;
  var zip = req.body.zipCode;

  connection.connect();
  var sql =
    "INSERT INTO Users (username, password, firstname,lastname,email,isPartner,zip) VALUES('" +
    username +
    "','" +
    password +
    "','" +
    firstname +
    "','" +
    lastname +
    "','" +
    email +
    "','" +
    isPartner +
    "','" +
    zip +
    "')";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send({
      message: "New user:" + username + " was added to the database",
    });
  });
  connection.end();
});

// Sign Up -- Might move to modular auth file after testing
router.post("/api/signup", async (req, res) => {
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
      `https://booking-api/dbconnections/signup`,
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

// User and Partner Info API Calls
//
//
//
// Fetch user by UID
router.get("/api/getUserByUid/:uid", (req, res) => {
  var uid = req.params.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserById(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch user by authID
router.post("/api/getUserByEmail", (req, res) => {
  var email = req.body.email;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserByEmail(email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch user by username
router.post("/api/getUserByUsername", (req, res) => {
  var username = req.body.username;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserByUsername(username);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => {
      console.log("Error:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching user data" });
    });
});

// Is this user a partner by uid
router.get("/api/isPartner/:uid", (req, res) => {
  var uid = req.params.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.isPartner(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get partner info by uid
router.get("/api/getPartnerByUid/:uid", (req, res) => {
  var uid = req.params.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerByUid(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert User
router.post("/api/insertuser", (req, res) => {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var zip = req.body.zip;
  var password = req.body.password;

  const db = dbService.getDbServiceInstance();
  const result = db.insertUser(firstName, lastName, email, zip, password);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update User
router.post("/api/updateuser", (req, res) => {
  var uID = req.body.uID;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var zip = req.body.zip;

  const db = dbService.getDbServiceInstance();
  const result = db.updateUser(uID, firstName, lastName, zip);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert Partner
router.post("/api/insertpartner", (req, res) => {
  var businessName = req.body.businessName;
  var category = req.body.category;
  var email = req.body.email;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;

  const db = dbService.getDbServiceInstance();
  const result = db.insertPartner(
    businessName,
    category,
    email,
    address,
    city,
    state,
    zip
  );

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Classify a user as a partner account, either admin or employee
router.post("/api/makeUserPartner", (req, res) => {
  var uid = req.body.uid;
  var pid = req.body.pid;
  var isAdmin = req.body.isAdmin; // BOOL must be sent as 0 or 1 with no quotes in JSON e.g. "isAdmim" : 1 or "isAdmim" : 0

  const db = dbService.getDbServiceInstance();
  const result = db.makeUserPartner(uid, pid, isAdmin);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update Partner
router.post("/api/updatepartner", (req, res) => {
  var pID = req.body.pID;
  var businessName = req.body.businessName;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;

  const db = dbService.getDbServiceInstance();
  const result = db.updatePartner(pID, businessName, address, city, state, zip);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert Hours
router.post("/api/insertHours", (req, res) => {
  var pID = req.body.pID;
  var day = req.body.day;
  var open = req.body.open;
  var close = req.body.close;

  const db = dbService.getDbServiceInstance();
  const result = db.insertHours(pID, day, open, close);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update Hours
router.post("/api/updateHours", (req, res) => {
  var pID = req.body.pID;
  var day = req.body.day;
  var open = req.body.open;
  var close = req.body.close;

  const db = dbService.getDbServiceInstance();
  const result = db.updateHours(pID, day, open, close);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get days/hours available for partner
router.get("/api/getHours/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getHours(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get future bookings for calendar
router.get("/api/getFutureBookings/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getFutureBookings(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get all bookings for partner
router.get("/api/getAllBookings/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getAllBookings(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Search Businesses and Services
router.get("/api/getSearchResults/:criteria", (req, res) => {
  var criteria = req.params.criteria;
  const db = dbService.getDbServiceInstance();
  const result = db.getSearchResults(criteria);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

router.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

// Insert User Review
router.post("/api/insertUserReview", (req, res) => {
  var uID = req.body.uID;
  var pID = req.body.pID;
  var reviewText = req.body.reviewText;
  var score = req.body.score;

  const db = dbService.getDbServiceInstance();
  const result = db.insertUserReview(uID, pID, reviewText, score);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert Partner Review Response
router.post("/api/insertPartnerReviewResponse", (req, res) => {
  var uID = req.body.uID;
  var pID = req.body.pID;
  var reviewText = req.body.responseText;

  const db = dbService.getDbServiceInstance();
  const result = db.insertPartnerReviewResponse(uID, pID, responseText);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get all reviews for a Partner
router.get("/api/getPartnerReviews/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerReviews(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Check if user can leave review for partner, 1 for yes, 0 for no
router.get("/api/canUserAddReview/:uID/:pID", (req, res) => {
  var uID = req.params.uID;
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.canUserAddReview(uID, pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Check if partner can add response to review, 1 for yes, 0 for no
router.get("/api/canPartnerAddResponse/:rID", (req, res) => {
  var rID = req.params.rID;
  const db = dbService.getDbServiceInstance();
  const result = db.canPartnerAddResponse(rID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

module.exports = router;
