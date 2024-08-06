import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getPopularMovies } from "../../data/popularMoviesSlice";
import Header from "../../shared/components/header/Header.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

const PopularMoviesPage = () => {
  const dispatch = useDispatch();
  const { popularMovies } = useSelector((state) => state.popularMovies);

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  return (
    <>
      <Header />
      <main>
        <MovieGrid
          title="Popular Movies"
          emptyStateMessage="There are no popular movies to show."
          movies={popularMovies}
        />
      </main>
    </>
  );
};

export default PopularMoviesPage;
