const baseURL = "https://www.openlibrary.org";
const subjectsURL = "https://www.openlibrary.org/subjects";

import axios from "axios";

// Get list of books by String:Subject, return object with 12 random entries.
// max Limit is 1000. add limit=value
export const getBySubject = async (subject) => {
  const initList = await axios
    .get(`${subjectsURL}/${subject.toLowerCase()}.json?details=true`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error("ERROR INITLIST: ", err));

  return initList;
};

export const getWork = async (key) => {
  const pageInfo = {};

  const workInfo = await axios
    .get(`${baseURL}/works/${key}.json`)
    .then((res) => res.data)
    .catch((err) => console.error("ERROR WORKINFO: ", err));

  const authorInfo = await axios
    .get(`${baseURL}${workInfo.authors[0].author.key}.json`)
    .then((res) => res.data)
    .catch((err) => console.error("ERROR AUTHORINFO: ", err));

  pageInfo = { workInfo, author_name: authorInfo.personal_name, bookInfo };

  return pageInfo;
};
