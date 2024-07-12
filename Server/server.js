const express = require("express");
const mysql = require("mysql");

// AUTH0 REQUIRED IMPORTS
const axios = require("axios");
const querystring = require("querystring");
const session = require("express-session");
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
const routes = require("./routes");

const app = express();
const PORT = 5002;

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// AUTH0
// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "https://booking-api/",
  issuerBaseURL: `https://dev-gh4kxlfpg0ce2ig2.us.auth0.com`,
});

// EXAMPLES
// This route doesn't need authentication
app.get("/api/public", function (req, res) {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

// This route needs authentication
app.get("/api/private", checkJwt, function (req, res) {
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this.",
  });
});

app.get(
  "/api/private-scoped",
  checkJwt,
  requiredScopes("read:messages"),
  function (req, res) {
    res.json({
      message:
        "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.",
    });
  }
);

// END OF EXAMPLES

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

// LOGIN
// Setup session middleware
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
