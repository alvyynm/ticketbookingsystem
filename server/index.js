const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;

// import routes
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");
const ticketRoutes = require("./routes/ticketRoute");

const app = express();

// Disable the "X-Powered-By" header
app.disable("x-powered-by");

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello world!",
  });
});

app.use("/v1/auth", authRoutes);
app.use("/v1", eventRoutes);
app.use("/v1", ticketRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
