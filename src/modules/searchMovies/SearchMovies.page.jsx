import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";
import { searchMovies } from "./searchMoviesSlice.js";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import ErrorState from "../../shared/components/errorState/ErrorState.jsx";

const SearchMoviesPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const dispatch = useDispatch();
  const { searchedMovies, status, error } = useSelector(
    (state) => state.searchedMovies,
  );

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMovies(searchQuery));
    }
  }, [searchQuery, dispatch]);

  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "failed") {
    return <ErrorState error={error} />;
  }

  return (
    <main className="main">
      <MovieGrid
        title={`Search: ${searchQuery}`}
        emptyStateMessage="No movies matched your search. Try searching for something else."
        movies={searchedMovies}
      />
    </main>
  );
};

export default SearchMoviesPage;
