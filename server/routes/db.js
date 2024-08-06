require("dotenv").config({ path: "../client/.env" });

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

//
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

// User and Partner Info API Calls
//
//
//
// Fetch user by UID
router.get("/api/getUserByUid/:uID", (req, res) => {
  var uid = req.params.uID;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserById(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch user by email
router.post("/api/getUserByEmail", (req, res) => {
  var email = req.body.email;
  const db = dbService.getDbServiceInstance();
  const result = db.getUserByEmail(email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch partner by email
router.post("/api/getPartnerByEmail", (req, res) => {
  var email = req.body.email;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerByEmail(email);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch partner by email
router.post("/api/getBusinessByPID", (req, res) => {
  var pid = req.body.pid;
  const db = dbService.getDbServiceInstance();
  const result = db.getBusinessByPID(pid);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Fetch partner admin credentials
router.post("/api/getPartnerAdmin", (req, res) => {
  var uid = req.body.uid;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerAdmin(uid);
  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Is this user a partner by uid
router.get("/api/isPartner/:uID", (req, res) => {
  var uid = req.params.uID;
  const db = dbService.getDbServiceInstance();
  const result = db.isPartner(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get partner info by uid
router.get("/api/getPartnerByUid/:uID", (req, res) => {
  var uid = req.params.uID;
  const db = dbService.getDbServiceInstance();
  const result = db.getPartnerByUid(uid);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert User
router.post("/api/insertUser", (req, res) => {
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
router.post("/api/updateUser", (req, res) => {
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

// Update Password
router.post("/api/updatePassword", (req, res) => {
  var uID = req.body.uID;
  var password = req.body.password;

  const db = dbService.getDbServiceInstance();
  const result = db.updatePassword(uID, password);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert Partner
router.post("/api/insertPartner", (req, res) => {
  var businessName = req.body.businessName;
  var category = req.body.category;
  var email = req.body.email;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var aboutUs = req.body.aboutUs;

  const db = dbService.getDbServiceInstance();
  const result = db.insertPartner(
    businessName,
    category,
    email,
    address,
    city,
    state,
    zip,
    aboutUs
  );

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Classify a user as a partner account, either admin or employee
router.post("/api/makeUserPartner", (req, res) => {
  var uid = req.body.uID;
  var pid = req.body.pID;
  var isAdmin = req.body.isAdmin; // BOOL must be sent as 0 or 1 with no quotes in JSON e.g. "isAdmim" : 1 or "isAdmim" : 0

  const db = dbService.getDbServiceInstance();
  const result = db.makeUserPartner(uid, pid, isAdmin);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update Partner
router.post("/api/updatePartner", (req, res) => {
  var pID = req.body.pID;
  var businessName = req.body.businessName;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zipCode;
  var category = req.body.category;
  var aboutUs = req.body.aboutUs;

  const db = dbService.getDbServiceInstance();
  const result = db.updatePartner(
    pID,
    businessName,
    address,
    city,
    state,
    zip,
    category,
    aboutUs
  );

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

// Insert Service
router.post("/api/insertService", (req, res) => {
  var pID = req.body.pID;
  var name = req.body.name;
  var duration = req.body.duration;
  var cost = req.body.cost;

  const db = dbService.getDbServiceInstance();
  const result = db.insertService(pID, name, duration, cost);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update service
router.post("/api/updateService", (req, res) => {
  var sID = req.body.sID;
  var name = req.body.name;
  var duration = req.body.duration;
  var cost = req.body.cost;
  var description = req.body.description;

  const db = dbService.getDbServiceInstance();
  const result = db.updateService(sID, name, duration, cost, description);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get services available for partner
router.get("/api/getServices/:pID", (req, res) => {
  var pID = req.params.pID;
  const db = dbService.getDbServiceInstance();
  const result = db.getServices(pID);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Insert Booking
router.post("/api/insertBooking", (req, res) => {
  var uID = req.body.uID;
  var pID = req.body.pID;
  var sID = req.body.sID;
  var startTime = req.body.startTime;

  const db = dbService.getDbServiceInstance();
  const result = db.insertBooking(uID, pID, sID, startTime);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update booking status
router.post("/api/updateBookingStatus", (req, res) => {
  var bID = req.body.bID;
  var status = req.body.status;

  const db = dbService.getDbServiceInstance();
  const result = db.updateBookingStatus(bID, status);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update booking discount
router.post("/api/updateBookingDiscount", (req, res) => {
  var bID = req.body.bID;
  var discount = req.body.discount;

  const db = dbService.getDbServiceInstance();
  const result = db.updateBookingDiscount(bID, discount);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Update booking time
router.post("/api/updateBookingTime", (req, res) => {
  var bID = req.body.bID;
  var startTime = req.body.startTime;

  const db = dbService.getDbServiceInstance();
  const result = db.updateBookingtime(bID, startTime);

  result
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
});

// Get bookings for a partner by pID starting on given date
router.post("/api/getFutureBookings", (req, res) => {
  var pID = req.body.pID;
  var startTime = req.body.startTime;

  const db = dbService.getDbServiceInstance();
  const result = db.getFutureBookings(pID, startTime);

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
