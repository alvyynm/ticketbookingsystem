const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const winston = require("winston");
const helmet = require("helmet");
require("dotenv").config({ path: `${process.cwd()}/.env` });
const corsOptions = require("./config/corsOptions");
const port = process.env.PORT || 4000;

// import routes
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");
const ticketRoutes = require("./routes/ticketRoute");
const { sequelize } = require("./db/models");

const app = express();
// use cookieParser to parse jwt stored in cookies
app.use(cookieParser());

// Setup logging with winston

const logger = winston.createLogger({
  // Log only if info.level is less than (meaning more severe) or equal to this
  level: "info",
  // Use timestamp and printf to create a standard log format
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  // Log to the console and a file
  transports: [
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      options: { flags: "a" },
    }),
    new winston.transports.File({
      filename: "logs/api.log",
      options: { flags: "a" },
    }),
  ],
});

// In development, log to the console as well with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}
// compress all responses
app.use(
  compression({
    // filter: Decide if the response should be compressed or not,
    filter: shouldCompress,
    // threshold: It is the byte threshold for the response
    // body size before considering compression, the default is 1 kB
    threshold: 0,
  })
);

// Disable the "X-Powered-By" header
app.disable("x-powered-by");

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json());

// Prevent cors errors
app.use(cors(corsOptions));

app.use(helmet());

app.use((req, res, next) => {
  // Log an info message for each incoming request
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});

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
  logger.error(error.message);
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
