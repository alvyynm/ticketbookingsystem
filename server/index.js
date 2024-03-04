const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const port = process.env.PORT || 4000;

// import routes
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");
const ticketRoutes = require("./routes/ticketRoute");
const { sequelize } = require("./db/models");

const app = express();
// use cookieParser to parse jwt stored in cookies
app.use(cookieParser());

// compress all responses
app.use(compression());

// Disable the "X-Powered-By" header
app.disable("x-powered-by");

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json());

// Prevent cors errors
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello world!",
  });
});

app.use("/v1/auth", authRoutes);
app.use("/v1", eventRoutes);
app.use("/v1", ticketRoutes);
// catch all route for catching unspecificied routes
app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "failed",
    message: "Route not found, please double check",
  });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    status: "failed",
    message: data ? data[0].msg : message,
    data: [],
  });
});

const connectDb = async () => {
  console.log("Checking db connection...");

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

(async () => {
  await connectDb();
  console.log("Starting server ...");
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
