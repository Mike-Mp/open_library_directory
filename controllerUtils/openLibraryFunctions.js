const subjectsURL = "https://www.openlibrary.org/subjects";
const coversURL = "https://www.covers.openlibrary.org/b";
// http://covers.openlibrary.org/b/$key/$value-$size.jpg

import axios from "axios";

// Get list of books by String:Subject, return object with 12 random entries.
export const getBySubject = async (subject) => {
  const initWorkList = await axios
    .get(`${subjectsURL}/${subject.toLowerCase()}.json?limit=100&details=true`)
    .then((res) => {
      return res.data.works;
    })
    .catch((err) => console.error(err));

  const starterPos = randomSelection();
  const entries = [];
  for (let i = starterPos; i < starterPos + 12; i++) {
    entries.push(initWorkList[i]);
  }

  // const bookCovers = await findCovers(entries, 0);

  // console.log(bookCovers);

  return entries;
};

const randomSelection = () => {
  const rand = Math.floor(Math.random() * Math.floor(100));
  let starterPos;

  if (rand - 12 < 0) {
    starterPos = 0;
  } else {
    starterPos = rand - 12;
  }

  return starterPos;
};

// // pageType = 0 === for slider , pageType = 1 === for book page
// export const findCovers = async (bookList, pageType) => {
//   const coverList = [];
//   let size;
//   if (pageType == 0) {
//     size = "M";
//   } else {
//     size = "S";
//   }

//   for (let i = 0; i < bookList.length(); i++) {
//     const cover = await axios
//       .get(`${coversURL}/id/${bookList[i].cover_id}-${size}`)
//       .then((res) => res)
//       .catch((err) => console.error(err));

//     console.log(cover);
//     coverList.push(cover);
//   }

//   return coverList;
// };
