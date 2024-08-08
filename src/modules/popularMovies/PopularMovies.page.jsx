import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  BEARER_TOKEN,
  API_URL,
  ACCOUNT_ID,
} from "../../shared/utils/constants";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";
import { useInfiniteScroll } from "../../shared/hooks/useInfiniteScroll.js";

import { getPopularMovies } from "./popularMoviesSlice.js";

const PopularMoviesPage = () => {
  const dispatch = useDispatch();
  const { hasReachedBottom } = useInfiniteScroll();
  const { popularMovies, currentPage, hasMore, status, error } = useSelector(
    (state) => state.popularMovies,
  );

  const isLoading = status === "loading";

  useEffect(() => {
    if (popularMovies.length === 0 && !isLoading) {
      console.log(BEARER_TOKEN, ACCOUNT_ID, API_URL);
      dispatch(getPopularMovies(currentPage));
    } else if (hasReachedBottom && hasMore && !isLoading) {
      dispatch(getPopularMovies(currentPage + 1));
    }
  }, [
    dispatch,
    popularMovies,
    hasReachedBottom,
    hasMore,
    currentPage,
    isLoading,
  ]);

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
