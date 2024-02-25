const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;

// import routes
const authRoutes = require("./routes/authRoute");
const eventRoutes = require("./routes/eventRoute");

const app = express();

// Disable the "X-Powered-By" header
app.disable("x-powered-by");

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/v1/auth", authRoutes);
app.use("/v1", eventRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
