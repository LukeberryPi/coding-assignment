import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

import { getPopularMovies } from "./popularMoviesSlice.js";
import { useInfiniteScroll } from "../../shared/hooks/useInfiniteScroll.js";

const PopularMoviesPage = () => {
  const dispatch = useDispatch();
  const { popularMovies, currentPage, hasMore, status, error } = useSelector(
    (state) => state.popularMovies,
  );

  const { hasReachedBottom } = useInfiniteScroll();

  useEffect(() => {
    if (popularMovies.length === 0) {
      dispatch(getPopularMovies(1));
    } else if (hasReachedBottom && hasMore) {
      dispatch(getPopularMovies(currentPage + 1));
    }
  }, [dispatch, popularMovies, hasReachedBottom, hasMore, currentPage, status]);

  // if (status === "loading") {
  //   return <LoadingState />;
  // }

  if (status === "failed") {
    return <ErrorState error={error} />;
  }

  return (
    <main className="main-container">
      <MovieGrid
        title="Popular Movies"
        emptyStateMessage="There are no popular movies to show."
        movies={popularMovies}
      />
    </main>
  );
};

export default PopularMoviesPage;
