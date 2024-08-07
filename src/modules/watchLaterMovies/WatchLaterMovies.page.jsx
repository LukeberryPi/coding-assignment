import { useDispatch, useSelector } from "react-redux";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";
import { getWatchLaterMovies } from "./watchLaterMoviesSlice.js";
import { useEffect } from "react";

const WatchLaterPage = () => {
  const dispatch = useDispatch();
  const { watchLaterMovies, status, error } = useSelector(
    (state) => state.watchLaterMovies,
  );

  console.log(watchLaterMovies);

  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "failed") {
    return <ErrorState error={error} />;
  }

  return (
    <main>
      <MovieGrid
        title="Watch Later Movies"
        movies={watchLaterMovies}
        emptyStateMessage="You have no Watch Later movies. You can add some on the home page."
      />
    </main>
  );
};

export default WatchLaterPage;
