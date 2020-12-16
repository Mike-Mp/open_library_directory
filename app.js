const express = require("express");
const app = express();
const router = require("./controller/routes.js");
const path = require("path");
const middleware = require("./utils/middleware");

app.use(express.json());

app.set("view engine", "pug");

// app.use(middleware.logger);

app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname + "public");
// Routes
app.use("/", router);

// Error handling

module.exports = app;
