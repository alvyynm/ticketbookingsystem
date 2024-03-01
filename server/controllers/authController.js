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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    error.data = errors.array();
    throw error;
  }

  const { email, password } = req.body;
  let loggedInUser;

  User.findOne({
    where: {
      user_email: email,
    },
  })
    .then((user) => {
      if (!user) {
        const error = new Error(
          "No account found, please create a new account"
        );
        error.statusCode = 404;
        throw error;
      }
      loggedInUser = user;
      return bcrypt.compare(password, user.user_password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
      }
      // log in the user
      // create jwt token and return it to the user
      const token = jwt.sign(
        {
          email: loggedInUser.user_email,
          userId: loggedInUser.id,
          userRole: loggedInUser.user_role,
        },
        secret,
        {
          expiresIn: "4h",
        }
      );
      // set cookie
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
      });
      // res.setHeader("Set-Cookie", "isLoggedin=true");

      res.status(200).json({
        status: "success",
        message: "Login successful!",
        data: {
          token: token,
          user_id: loggedInUser.id,
          email: loggedInUser.user_email,
          name: loggedInUser.user_name,
          role: loggedInUser.user_role,
        },
      });
    })
    .catch((error) => {
      console.log(error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

const logout = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  return res.status(200).json({
    status: "success",
    message: "User successfully logged out",
    data: {},
  });
};

module.exports = { signup, login, logout };
