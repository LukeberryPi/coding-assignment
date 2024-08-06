import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Header from "../../shared/components/header/Header.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

import { getFavoriteMovies } from "./favoriteMoviesSlice.js";

const FavoriteMoviesPage = () => {
  const dispatch = useDispatch();
  const { favoriteMovies, status, error } = useSelector(
    (state) => state.favoriteMovies,
  );

  useEffect(() => {
    dispatch(getFavoriteMovies());
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
          title="Favorite Movies"
          emptyStateMessage="You have no movies saved to Favorite. You can add some on the home page."
          movies={favoriteMovies}
        />
      </main>
    </>
  );
};

export default FavoriteMoviesPage;
