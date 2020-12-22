const baseURL = "https://www.openlibrary.org/subjects";
import axios from "axios";

// Get list of books by String:Subject, return object with 12 random entries.
export const getBySubject = async (subject) => {
  const initList = await axios
    .get(`${baseURL}/${subject.toLowerCase()}.json`)
    .then((res) => res.data.works)
    .catch((err) => console.error(err));
};
