const { body } = require("express-validator");

module.exports = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .custom((value, { req }) => {
      return User.findOne({ where: { user_email: value } }).then((userDoc) => {
        if (userDoc) {
          return Promise.reject("Email address already exists!");
        }
      });
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
];
