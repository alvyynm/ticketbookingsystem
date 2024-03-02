const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { User } = require("../db/models");
const isAuthenticated = require("../middleware/is-auth");
const signupValidation = require("../utils/datavalidators/signupValidation");
const router = express.Router();

// Auth routes
// POST v1/auth/signup
router.post("/signup", signupValidation, authController.signup);

// POST v1/auth/login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Enter a valid email")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  authController.login
);

// POST /auth/logout
router.post("/logout", isAuthenticated, authController.logout);
module.exports = router;
