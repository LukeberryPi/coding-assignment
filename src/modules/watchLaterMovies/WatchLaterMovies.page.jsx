import { useSelector } from "react-redux";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

const WatchLaterPage = () => {
  const { watchLaterMovies, status, error } = useSelector(
    (state) => state.watchLaterMovies,
  );

  if (status === "loading") {
    return <LoadingState />;
  }

  if (status === "failed") {
    return <ErrorState error={error} />;
  }

  return (
    <main className="main-container">
      <MovieGrid
        title="Watch Later"
        movies={watchLaterMovies}
        emptyStateMessage="You have no Watch Later movies. You can add some on the home page."
      />
    </main>
  );
};

export default WatchLaterPage;
