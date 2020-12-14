const Router = require("express").Router();

Router.get("/", (req, res) => {
  console.log("route");
});

module.exports = Router;
