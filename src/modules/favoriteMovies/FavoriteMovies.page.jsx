import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import Header from "../../shared/components/header/Header.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";
import ResetStateButton from "../../shared/components/resetStateButton/ResetStateButton.jsx";

import {
  getFavoriteMovies,
  resetFavoriteMovies,
} from "./favoriteMoviesSlice.js";

const FavoriteMoviesPage = () => {
  const dispatch = useDispatch();
  const { favoriteMovies, status, error } = useSelector(
    (state) => state.favoriteMovies,
  );

  useEffect(() => {
    dispatch(getFavoriteMovies());
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
          title="Favorite Movies"
          emptyStateMessage="You have no Favorite Movies. You can add some on the home page."
          resetStateButton={
            <ResetStateButton
              message="Reset your Watch Later Movies"
              callback={resetFavoriteMovies}
            />
          }
          movies={favoriteMovies}
        />
      </main>
    </>
  );
};

export default FavoriteMoviesPage;
