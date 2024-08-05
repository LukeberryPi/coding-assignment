import { ACCOUNT_ID, API_URL, BEARER_TOKEN } from "../../utils/constants";

const getfavoriteMovies = async (pageParam = 1) => {
  const response = await fetch(
    `${API_URL}/account/${ACCOUNT_ID}/favorite/movies?page=${pageParam}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data.results;
};

export default getfavoriteMovies;
