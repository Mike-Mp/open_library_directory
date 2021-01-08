const Router = require("express").Router();
import { getBySubject, getBook } from "../controllerUtils/openLibraryFunctions";

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

Router.get("/about", (req, res) => {
  res.render("about");
});

Router.get("/subjects/:subject", async (req, res) => {
  const bookListExtraDetails = await getBySubject(req.params.subject);

  const title = req.params.subject
    .replace(/[_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

  res.render("subject", {
    title,
    bookListExtraDetails,
  });
});

Router.get("/books/:key", async (req, res) => {
  // const pageInfo = await getBook(req.params.key);
  let pageInfo = null;
  res.render("book", { pageInfo });
});

module.exports = Router;
