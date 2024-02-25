const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const router = express.Router();

// Auth routes
// POST v1/auth/signup
router.post("/signup", authController.signup);

// POST v1/auth/login
router.post("/login", authController.login);
module.exports = router;
