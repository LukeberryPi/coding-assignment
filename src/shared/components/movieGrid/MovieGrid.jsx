import { useRef, useState } from "react";

import { EmptyState } from "../../../shared/components/emptyState/EmptyState.jsx";
import MovieCard from "../movieCard/MovieCard.jsx";
import TrailerModal from "../trailerModal/trailerModal.jsx";
import getMovieTrailer from "../../services/getMovieTrailer";
import "./MovieGrid.scss";

const MovieGrid = ({ movies, title, emptyStateMessage }) => {
  const dialogRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const noMovies = movies.length === 0;
  const isHomePage = window.location.pathname === "/";

  const openTrailerModal = async (movie) => {
    setSelectedMovie(movie);
    const trailerKey = await getMovieTrailer(movie.id);
    if (!trailerKey) {
      console.error("No trailer found for this movie");
      return;
    }
    setSelectedMovie({ ...movie, youtubeVideoId: trailerKey });
    setIsDialogOpen(true);
  };

  const closeTrailerModal = () => {
    setIsDialogOpen(false);
    setSelectedMovie(null);
  };

  if (noMovies) {
    return <EmptyState message={emptyStateMessage} goToHome={!isHomePage} />;
  }

  return (
    <div className="movie-grid__container">
      <div className="movie-grid__header">
        <h2 className="movie-grid__title">{title}</h2>
      </div>
      <div className="movie-grid">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onPosterClick={() => openTrailerModal(movie)}
            />
          ))}
      </div>
      {selectedMovie && (
        <TrailerModal
          ref={dialogRef}
          movieTitle={selectedMovie.title}
          youtubeVideoId={selectedMovie.youtubeVideoId}
          onClose={closeTrailerModal}
          isOpen={isDialogOpen}
        />
      )}
    </div>
  );
};

export default MovieGrid;
