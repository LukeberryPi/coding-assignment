const getMoviesBySearchQuery = async (query, pageParam = 1) => {
  const url = `${process.env.REACT_APP_API_URL}/search/movie?query=${query}&page=${pageParam}`;
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
    },
  });
  const data = await response.json();

  return data;
};

export default getMoviesBySearchQuery;
