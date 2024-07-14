const express = require("express");
const authRoutes = require("./auth");
const dbRoutes = require("./db");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/db", dbRoutes);

module.exports = router;
