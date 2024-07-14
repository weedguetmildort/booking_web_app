require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const https = require("node:https");

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

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
