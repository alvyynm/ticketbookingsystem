require("dotenv").config();

const signup = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Signup successful",
  });
};

const login = (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Login successful",
  });
};

module.exports = { signup, login };
