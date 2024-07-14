const express = require("express");
const mysql = require("mysql");

const dotenv = require("dotenv")
dotenv.config()

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// })

// connection.connect((err) => {
//   if (err) {
//       console.log(err.message)
//   }
// })

const https = require("node:https");


// AUTH0 REQUIRED IMPORTS
const session = require("express-session");
const routes = require("./routes");

const db = require("./dbService.js");
const dbService = require("./dbService.js");

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
  var uid = req.params.uid
  const db = dbService.getDbServiceInstance()
  const result = db.getUserById(uid)

  result
  .then(data => res.json({data : data}))
  .catch(err => console.log(err))

})

// Fetch user by authID
app.post("/api/getUserByAuthId", (req, res) => {
  var authid = req.body.authid
  const db = dbService.getDbServiceInstance()
  const result = db.getUserByAuthId(authid)

  result
  .then(data => res.json({data : data}))
  .catch(err => console.log(err))

})

// Is this user a partner by uid
app.get("/api/isPartner/:uid", (req, res) => {
  var uid = req.params.uid
  const db = dbService.getDbServiceInstance()
  const result = db.isPartner(uid)

  result
  .then(data => res.json({data : data}))
  .catch(err => console.log(err))

})

// Get partner info by uid
app.get("/api/getPartnerByUid/:uid", (req, res) => {
  var uid = req.params.uid
  const db = dbService.getDbServiceInstance()
  const result = db.getPartnerByUid(uid)

  result
  .then(data => res.json({data : data}))
  .catch(err => console.log(err))

})

// Insert User
app.post("/api/insertuser", (req, res) => {
  var authID = req.body.authID;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var zip = req.body.zip;

  const db = dbService.getDbServiceInstance()
  const result = db.insertUser(authID, firstName, lastName, email, zip)

   result
   .then(data => res.json({data : data}))
   .catch(err => console.log(err))
  

})

// Insert Partner
app.post("/api/insertpartner", (req, res) => {
  var businessName = req.body.businessName;
  var category = req.body.category;
  var email = req.body.email;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;


  const db = dbService.getDbServiceInstance()
  const result = db.insertPartner(businessName, category, email, address, city, state, zip)

   result
   .then(data => res.json({data : data}))
   .catch(err => console.log(err))
  

})

// Classify a user as a partner account, either admin or employee
app.post("/api/makeUserPartner", (req, res) => {
  var uid = req.body.uid;
  var pid = req.body.pid;
  var isAdmin = req.body.isAdmin // BOOL must be sent as 0 or 1 with no quotes in JSON e.g. "isAdmim" : 1 or "isAdmim" : 0

  const db = dbService.getDbServiceInstance()
  const result = db.makeUserPartner(uid, pid, isAdmin)

   result
   .then(data => res.json({data : data}))
   .catch(err => console.log(err))
  

})

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
