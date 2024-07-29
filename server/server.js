// REQUIRED IMPORTS
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const dotenv = require("dotenv");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8080;

// REQUIRED CONFIGS
dotenv.config();

// Other Setup **In Progress**

// const db = require("./dbService.js");
// const dbService = require("./dbService.js");

// PARSERS AND NETWORK CONFIGS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// LOGIN - Setup session middleware
// app.use(
//   session({
//     secret: "app_session_secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }, // Set to true in production
//   })
// );

// MAIN LOGIC
app.use(routes);

// NEW API CALLS
// Sign Up -- Might move to modular auth file after testing
app.post("/api/signup", async (req, res) => {
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
app.get("/api/getUserByUid/:uid", (req, res) => {
  var uid = req.params.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserById(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch user by authID
app.post("/api/getUserByEmail", (req, res) => {
  var email = req.body.email;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserByEmail(email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Is this user a partner by uid
app.get("/api/isPartner/:uid", (req, res) => {
  var uid = req.params.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.isPartner(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get partner info by uid
app.get("/api/getPartnerByUid/:uid", (req, res) => {
  var uid = req.params.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerByUid(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert User
app.post("/api/insertuser", (req, res) => {
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
app.post("/api/updateuser", (req, res) => {
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
app.post("/api/insertpartner", (req, res) => {
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
app.post("/api/makeUserPartner", (req, res) => {
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
app.post("/api/updatepartner", (req, res) => {
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
app.post("/api/insertHours", (req, res) => {
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
app.post("/api/updateHours", (req, res) => {
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
app.get("/api/getHours/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getHours(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get future bookings for calendar
app.get("/api/getFutureBookings/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getFutureBookings(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get all bookings for partner
app.get("/api/getAllBookings/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getAllBookings(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Search Businesses and Services
app.get("/api/getSearchResults/:criteria", (req, res) => {
  var criteria = req.params.criteria;
  const db = dbService.getDbServiceInstance();
  const result = db.getSearchResults(criteria);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

// Insert User Review
app.post("/api/insertUserReview", (req, res) => {
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
app.post("/api/insertPartnerReviewResponse", (req, res) => {
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
app.get("/api/getPartnerReviews/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerReviews(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Check if user can leave review for partner, 1 for yes, 0 for no
app.get("/api/canUserAddReview/:uID/:pID", (req, res) => {
  var uID = req.params.uID;
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.canUserAddReview(uID, pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Check if partner can add response to review, 1 for yes, 0 for no
app.get("/api/canPartnerAddResponse/:rID", (req, res) => {
  var rID = req.params.rID;
  const db = dbService.getDbServiceInstance();
  const result = db.canPartnerAddResponse(rID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});
