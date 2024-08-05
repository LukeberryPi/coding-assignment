import {
  ACCOUNT_ID,
  API_URL,
  BEARER_TOKEN,
} from "../../../shared/utils/constants";

const url = `${API_URL}/account/${ACCOUNT_ID}/watchlist`;
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

const addWatchLaterMovie = async (movieId) => {
  await fetch(url, {
    options,
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true,
    }),
  });
};

export default addWatchLaterMovie;
