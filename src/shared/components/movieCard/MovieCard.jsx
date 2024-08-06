import { useRef, useState } from "react";

import { Clock, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { addFavoriteMovie } from "../../../modules/favoriteMovies/favoriteMoviesSlice.js";
import { addWatchLaterMovie } from "../../../modules/watchLaterMovies/watchLaterMoviesSlice.js";
import TrailerModal from "../trailerModal/TrailerModal.jsx";
import "./MovieCard.scss";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { favoriteMovies, status, error } = useSelector(
    (state) => state.favoriteMovies,
  );
  // const {
  //   watchLaterMovies,
  //   // status: watchLaterStatus,
  //   // error: watchLaterError,
  // // } = useSelector((state) => state.watchLaterMovies);

  // @Todo: find interface and fix
  // const isFavoriteMovie = favoriteMovies.some(
  //   (favorite) => favorite.id === 888,
  // );
  // console.log(isFavoriteMovie);
  // const isWatchLaterMovie = watchLaterMovies.includes(movie.id);

  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  const { id, poster_path, title } = movie;

  const getImageURL = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };

  const handleStarClick = () => {
    dispatch(addFavoriteMovie(id));
  };

  const handleClockClick = () => {
    dispatch(addWatchLaterMovie(id));
  };

  // @Todo: open modal with trailer dialog
  const handlePosterClick = () => {
    dialogRef.current.showModal();
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      {isDialogOpen && (
        <TrailerModal
          movieTitle={title}
          youtubeVideoId={youtubeVideoId}
          closeModal={setIsDialogOpen}
          ref={dialogRef}
          onClose={closeDialog}
        />
      )}
      <div className="movie-card">
        <button onClick={handlePosterClick}>
          <img
            className="movie-card__image"
            src={getImageURL(poster_path)}
            alt={`${title} poster`}
          />
        </button>
        <div className="movie-card__title-container">
          <p className="movie-card__title">{title}</p>
        </div>
        <div className="movie-card__actions">
          <button onClick={handleStarClick}>
            <Star />
            <span>Add</span>
          </button>
          <button onClick={handleClockClick}>
            <Clock />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
