const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { User } = require("../db/models");
const router = express.Router();

// Auth routes
// POST v1/auth/signup
router.post(
  "/signup",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ where: { user_email: value } }).then(
          (userDoc) => {
            if (userDoc) {
              return Promise.reject("Email address already exists!");
            }
          }
        );
      })
      .normalizeEmail(),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
      .withMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

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
module.exports = router;
