const Router = require("express").Router();
import { getBySubject, getBook } from "../controllerUtils/openLibraryFunctions";
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
  console.log("GET", GET, "SET", SET);
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
  console.log("bookListExtraDetails exist?", bookListExtraDetails !== null);
  if (bookListExtraDetails) {
    console.log("using cached data");
    bookListExtraDetails = JSON.parse(bookListExtraDetails);
    res.render("subject", {
      title,
      bookListExtraDetails,
    });
    return;
  }

  console.log("do i reach this part????");
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
  if (pageInfo) {
    console.log("using cached data");
    pageInfo = JSON.parse(pageInfo);
    res.render("book", {
      pageInfo,
    });
    return;
  }
  pageInfo = await getBook(req.params.key);
  // let pageInfo = null;
  await SET(`books/${req.params.key}`, JSON.stringify(pageInfo), "EX", 3600);

  res.render("book", { pageInfo });
});

module.exports = Router;
