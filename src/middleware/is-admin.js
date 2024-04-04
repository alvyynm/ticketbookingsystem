// middleware for checking if the user is an administrator
const { User } = require("../db/models");

module.exports = (req, res, next) => {
  const userId = req.id;

  User.findByPk(userId)
    .then((user) => {
      // check if user is found
      // TODO: but is this necessary here?
      // Different approach:
      // I can add user role to jwt token payload
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 404;
        throw error;
      } else {
        if (user.user_role === "admin") {
          next();
        } else {
          const error = new Error("Unauthorized");
          error.statusCode = 403;
          throw error;
        }
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
