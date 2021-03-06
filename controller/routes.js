const Router = require("express").Router();
import {
  getBySubject,
  getBook,
  getAuthor,
} from "../controllerUtils/openLibraryFunctions";
import { GET, SET } from "../redisServer";

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
  const title = req.params.subject
    .replace(/[_]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());

  let bookListExtraDetails = await GET(`subjects/${req.params.subject}`);
  if (bookListExtraDetails) {
    bookListExtraDetails = JSON.parse(bookListExtraDetails);
    res.render("subject", {
      title,
      bookListExtraDetails,
    });
    return;
  }

  bookListExtraDetails = await getBySubject(req.params.subject);

  await SET(
    `subjects/${req.params.subject}`,
    JSON.stringify(bookListExtraDetails),
    "EX",
    3600
  );

  res.render("subject", {
    title,
    bookListExtraDetails,
  });
});

Router.get("/books/:key", async (req, res) => {
  let pageInfo = await GET(`books/${req.params.key}`);
  let title = req.params.key;
  if (pageInfo) {
    pageInfo = JSON.parse(pageInfo);
    res.render("book", {
      pageInfo,
      title,
    });
    return;
  }
  pageInfo = await getBook(req.params.key);
  await SET(`books/${req.params.key}`, JSON.stringify(pageInfo), "EX", 3600);

  res.render("book", { pageInfo, title });
});

Router.get("/authors/:author", async (req, res) => {
  let authorInfo = await GET(`authors/${req.params.author}`);
  let title;
  if (authorInfo) {
    authorInfo = JSON.parse(authorInfo);
    title = authorInfo.name;
    console.log(authorInfo);
    res.render("author", { authorInfo, title });
    return;
  }
  authorInfo = await getAuthor(req.params.author);
  title = authorInfo.name;
  await SET(
    `authors/${req.params.author}`,
    JSON.stringify(authorInfo),
    "EX",
    3600
  );
  res.render("author", { authorInfo, title });
});

module.exports = Router;
