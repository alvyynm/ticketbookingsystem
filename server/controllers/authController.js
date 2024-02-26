const { User } = require("../db/models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config();

const secret = process.env.MY_SECRET_KEY;
const bcryptSalt = process.env.BCRYPT_SALT;

const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid credentials");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  // read payload data from request body
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const role = req.body.role;

  bcrypt
    .hash(password, +bcryptSalt)
    .then((hashedPassword) => {
      const newUser = User.create({
        user_name: name,
        user_role: role,
        user_email: email,
        user_password: hashedPassword,
      });
      return newUser;
    })
    .then((user) => {
      // return res after successful signup
      res.status(201).json({
        status: "success",
        data: {
          id: user.id,
          name: user.user_name,
          email: user.user_email,
          role: user.user_role,
        },
        message: "Signup successful",
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 403;
      }
      error.message = "User account creation failed";
      next(error);
    });
};

const login = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Login successful",
  });
};

module.exports = { signup, login };
