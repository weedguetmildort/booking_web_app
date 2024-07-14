require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

// AUTH0 REQUIRED IMPORTS
const session = require("express-session");
const routes = require("./routes");

const app = express();
const PORT = 5002;
// const port = process.env.PORT || 8080;

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// AUTH0 - Transitioning to modularity structure
// LOGIN - Setup session middleware
app.use(
  session({
    secret: "app_session_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Set to true in production
  })
);

// MAIN LOGIN LOGIC -- NEEDS TO BE TESTED
app.use(routes);

//
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "dev",
  password: "password",
  database: "albertslist",
});

// Test API call
app.get("/api", (req, res) => {
  res.json({ users: ["user1", "user2", "user3"] });
});

// Test DB Call
app.get("/api/users", (req, res) => {
  connection.connect();

  connection.query("SELECT * from Users", (err, result) => {
    if (err) throw err;

    res.json(result);
  });
  connection.end();
});

// Test Insert User
app.post("/api/post/insertuser", (req, res) => {
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

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
