// REQUIRED IMPORTS
const express = require("express");
const cors = require("cors");

// CUSTOM REQUIRED IMPORTS
const dotenv = require("dotenv");
const routes = require("./routes");
const app = express();

// REQUIRED CONFIGS
dotenv.config();

// PORT SETUP
const PORT = process.env.PORT || 8080;

// PARSERS AND NETWORK CONFIGS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MAIN LOGIC
app.use(routes);

// SERVER STATUS
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
