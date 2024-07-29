require("dotenv").config({ path: "../.env" });

const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const dbService = require("../dbService");

//
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Might need to remove
connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

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

// Get user by username
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

module.exports = router;
