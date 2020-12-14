const express = require("express");
const app = express();
const router = "./controller/routes.js";
const path = require("path");

app.use(express.json());

app.use("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname + "public");
// Routes
app.use("/", router);

// Error handling

module.exports = app;
