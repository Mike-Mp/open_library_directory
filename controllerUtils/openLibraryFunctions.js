const baseURL = "https://www.openlibrary.org";
const subjectsURL = "https://www.openlibrary.org/subjects";

import axios from "axios";

export const getBySubject = async (subject) => {
  try {
    const initList = await axios.get(
      `${subjectsURL}/${subject.toLowerCase()}.json?details=true`
    );

    return initList.data;
  } catch (err) {
    console.error("ERROR INITLIST: ", err);
  }
};

export const getBook = async (key) => {
  const pageInfo = {};

  let bookInfo;
  let workInfo;
  let authorInfo;

  try {
    bookInfo = await axios.get(`${baseURL}/books/${key}.json`);
  } catch (err) {
    console.error("BOOKINFO ERROR: ", err);
  }

  try {
    workInfo = await axios.get(`${baseURL}${bookInfo.data.works[0].key}.json`);
  } catch (err) {
    console.error("ERROR WORKINFO: ", err);
  }

  try {
    authorInfo = await axios.get(
      `${baseURL}${workInfo.data.authors[0].author.key}.json`
    );
  } catch (err) {
    console.error("ERROR AUTHORINFO: ", err);
  }

  pageInfo.workInfo = workInfo.data;
  pageInfo.author_name = authorInfo.data.name;
  pageInfo.bookInfo = bookInfo.data;

  return pageInfo;
};
