import { useSelector } from "react-redux";
import { Route } from "react-router-dom";

import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";
import ResetStateButton from "../../shared/components/resetStateButton/ResetStateButton.jsx";

import { resetWatchLaterMovies } from "./watchLaterMoviesSlice.js";

const WatchLaterPage = () => {
  const {
    watchLaterMovies,
    status: watchLaterStatus,
    error: watchLaterError,
  } = useSelector((state) => state.watchLaterMovies);

  return (
    <Route
      path="/watch-later"
      element={
        <MovieGrid
          title="Watch Later Movies"
          movies={watchLaterMovies}
          emptyStateMessage="You have no movies saved to Watch Later. You can add some on the home page."
          resetStateButton={
            <ResetStateButton
              message="Reset your Watch Later Movies"
              callback={resetWatchLaterMovies}
            />
          }
        />
      }
    />
  );
};

export default WatchLaterPage;
