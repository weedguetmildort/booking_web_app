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

// PARSERS AND NETWORK CONFIGS
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MAIN LOGIC
app.use(routes);
