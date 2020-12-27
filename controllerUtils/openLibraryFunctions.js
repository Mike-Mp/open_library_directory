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

  const initWorkList = initList.works;

  delete initList.works;

  return [initList, initWorkList];
};

// select random pos for initWorkList
const randomSelection = () => {
  const rand = Math.floor(Math.random() * Math.floor(24));
  let starterPos;

  if (rand - 12 < 0) {
    starterPos = 0;
  } else {
    starterPos = rand - 12;
  }

  return starterPos;
};
