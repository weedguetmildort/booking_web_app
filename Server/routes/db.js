require("dotenv").config({ path: "../.env" });
const express = require("express");

const router = express.Router();

const mysql = require("mysql");

//
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "dev",
  password: "password",
  database: "albertslist",
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
router.post("/api/post/insertuser", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var email = req.body.email;
  var isPartner = req.body.isPartner;
  var zip = req.body.zip;

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

module.exports = router;
