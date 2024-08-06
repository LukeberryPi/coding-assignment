import { API_URL } from "../utils/constants";

// @Todo: move to thunk
const getMoviesBySearchQuery = async (query, pageParam = 1) => {
  const response = await fetch(
    `${API_URL}/movie?query=${query}&page=${pageParam}`,
  );
  const data = await response.json();
  return data.results;
};

export default getMoviesBySearchQuery;
