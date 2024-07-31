const express = require("express");
const authRoutes = require("./auth");
const dbRoutes = require("./db");
const addressRoutes = require("./address");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/db", dbRoutes);
router.use("/address", addressRoutes);

module.exports = router;
