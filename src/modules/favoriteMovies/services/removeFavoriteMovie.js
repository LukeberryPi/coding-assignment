import {
  ACCOUNT_ID,
  API_URL,
  BEARER_TOKEN,
} from "../../../shared/utils/constants";

const url = `${API_URL}/account/${ACCOUNT_ID}/favorite`;
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

const addfavoriteMovie = async (movieId) => {
  await fetch(url, {
    options,
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      favorite: false,
    }),
  });
};

export default addfavoriteMovie;
