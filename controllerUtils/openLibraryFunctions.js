const baseURL = "https://www.openlibrary.org/subjects";
import axios from "axios";

// Get list of books by String:Subject, return object with 12 random entries.
export const getBySubject = async (subject) => {
  const initWorkList = await axios
    .get(`${baseURL}/${subject.toLowerCase()}.json?limit=500`)
    .then((res) => res.data.works)
    .catch((err) => console.error(err));

  const starterPos = randomSelection();
  const entries = [];
  for (let i = starterPos; i < starterPos + 12; i++) {
    entries.push(initWorkList[i]);
  }

  return entries;
};

const randomSelection = () => {
  const rand = Math.floor(Math.random() * Math.floor(500));
  let starterPos;

  if (rand - 12 < 0) {
    starterPos = 0;
  } else {
    starterPos = rand - 12;
  }

  return starterPos;
};
