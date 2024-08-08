import { useSelector } from "react-redux";

import ErrorState from "../../shared/components/errorState/ErrorState.jsx";
import LoadingState from "../../shared/components/loadingState/LoadingState.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

const FavoriteMoviesPage = () => {
  const { favoriteMovies, status, error } = useSelector(
    (state) => state.favoriteMovies,
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
        title="Favorite Movies"
        movies={favoriteMovies}
        emptyStateMessage="You have no Favorite Movies. You can add some on the home page."
      />
    </main>
  );
};

export default FavoriteMoviesPage;
