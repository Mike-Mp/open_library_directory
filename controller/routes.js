const { reset } = require("nodemon");

const Router = require("express").Router();

const slides = {
  Art: "fas fa-brush",
  "Science Fiction": "fas fa-user-astronaut",
  Fantasy: "fas fa-dragon",
  Biographies: "fas fa-atlas",
  Recipes: "fas fa-utensils",
  Romance: "fas fa-heart",
  Textbooks: "fas fa-book-open",
  Children: "fas fa-child",
  History: "fas fa-book",
  Medicine: "fas fa-clinic-medical",
  Religion: "fas fa-pray",
  "Mystery Stories": "fas fa-book-dead",
  Plays: "fas fa-theater-masks",
  Music: "fas fa-music",
  Science: "fas fa-atom",
};

Router.get("/", (req, res) => {
  res.render("index", { slides });
});

Router.get("/subjects/:subject", async (req, res) => {
  res.render("subject", {});
});

module.exports = Router;
