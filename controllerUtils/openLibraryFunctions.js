const baseURL = "https://www.openlibrary.org";
const subjectsURL = "https://www.openlibrary.org/subjects";

import axios from "axios";

export const getBySubject = async (subject) => {
  const initList = await axios
    .get(`${subjectsURL}/${subject.toLowerCase()}.json?details=true`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error("ERROR INITLIST: ", err));

  return initList;
};

export const getBook = async (key) => {
  const pageInfo = {};

  const bookInfo = await axios
    .get(`${baseURL}/books/${key}.json`)
    .then((res) => res.data)
    .catch((err) => console.error("BOOKINFO ERROR: ", err));

  console.log(bookInfo);

  const workInfo = await axios
    .get(`${baseURL}${bookInfo.works[0].key}.json`)
    .then((res) => res.data)
    .catch((err) => console.error("ERROR WORKINFO: ", err));

  const authorInfo = await axios
    .get(`${baseURL}${bookInfo.authors[0].key}.json`)
    .then((res) => res.data)
    .catch((err) => console.error("ERROR AUTHORINFO: ", err));

  pageInfo.workInfo = workInfo;
  pageInfo.author_name = authorInfo.personal_name;
  pageInfo.bookInfo = bookInfo;

  return pageInfo;
};
