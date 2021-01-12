const baseURL = "https://www.openlibrary.org";
const subjectsURL = "https://www.openlibrary.org/subjects";

import axios from "axios";

export const getBySubject = async (subject) => {
  const initList = await axios.get(
    `${subjectsURL}/${subject.toLowerCase()}.json?details=true`
  );

  return initList.data;
};

export const getBook = async (key) => {
  const pageInfo = {};

  let bookInfo;
  let workInfo;
  let authorInfo;

  bookInfo = await axios.get(`${baseURL}/books/${key}.json`);

  workInfo = await axios.get(`${baseURL}${bookInfo.data.works[0].key}.json`);

  authorInfo = await axios.get(
    `${baseURL}${workInfo.data.authors[0].author.key}.json`
  );

  pageInfo.workInfo = workInfo.data;
  pageInfo.author_name = authorInfo.data.name;
  pageInfo.bookInfo = bookInfo.data;

  return pageInfo;
};

export const getAuthor = async (authorName) => {
  const authorInfo = await axios.get(`${baseURL}/authors/${authorName}.json`);

  return authorInfo.data;
};
