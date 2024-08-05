const getPopularMovies = async (pageParam = 1) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/discover/movie?include_adult=false&page=${pageParam}&sort_by=popularity.desc`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data.results;
};

export default getPopularMovies;
