import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getPopularMovies } from "../../data/popularMoviesSlice";
import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import Header from "../../shared/components/header/Header.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

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
