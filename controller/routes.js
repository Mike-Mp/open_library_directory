const Router = require("express").Router();

Router.get("/", (req, res) => {
  res.render("layout");
});

module.exports = Router;
