// middleware for checking if the user is authenticated
const jwt = require("jsonwebtoken");
const secret = process.env.MY_SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  // check if jwt token is included in request top determine is user is authenticated
  if (!token) {
    const error = new Error("Not auntheticated");
    error.statusCode = 401;
    throw error;
  }

  // const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, secret);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Not auntheticated");
    error.statusCode = 401;
    throw error;
  }

  req.id = decodedToken.userId;
  next();
};
