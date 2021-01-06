const express = require("express");
const app = express();
const router = require("./controller/routes.js");
const path = require("path");
const middleware = require("./utils/middleware");
const compression = require("compression");

app.use(compression());

app.use(express.json());

app.set("view engine", "pug");

// app.use(middleware.logger);

app.use(express.static("public"));

// Routes
app.use("/", router);

// Error handling

module.exports = app;
