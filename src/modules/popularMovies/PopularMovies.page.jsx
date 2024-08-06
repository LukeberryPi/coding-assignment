import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

import { getPopularMovies } from "./popularMoviesSlice.js";

const PopularMoviesPage = () => {
  const dispatch = useDispatch();
  const { popularMovies, status, error } = useSelector(
    (state) => state.popularMovies,
  );

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "failed") {
    return <ErrorState error={error} />;
  }

  return (
    <>
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
