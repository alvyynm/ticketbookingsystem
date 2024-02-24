const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;

const app = express();

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
