import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "../../shared/components/header/Header.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";
import ResetStateButton from "../../shared/components/resetStateButton/ResetStateButton.jsx";

import {
  getWatchLaterMovies,
  resetWatchLaterMovies,
} from "./watchLaterMoviesSlice.js";

const WatchLaterPage = () => {
  const dispatch = useDispatch();
  const { watchLaterMovies, status, error } = useSelector(
    (state) => state.watchLaterMovies,
  );

  useEffect(() => {
    dispatch(getWatchLaterMovies());
  }, [dispatch]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header />
      <main>
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
      </main>
    </>
  );
};

export default WatchLaterPage;
