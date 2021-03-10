require("dotenv").config();
const express = require("express");

const DataStore = require("./log.js");
const express = require("express");
const path = require("path");
const app = express();
const staticDir = path.resolve("./client/public");
const port = process.env.PORT || 5000;

const tilDB = new DataStore("mongodb://localhost:27017", "log", "entries");

app.use(express.static(staticDir));

app.listen(port, () => {
  console.log("listening on port", port);
});
