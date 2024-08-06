import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import "./MovieCard.scss";
import { addFavoriteMovie } from "../../../modules/favoriteMovies/favoriteMoviesSlice.js";
import TrailerModal from "../trailerModal/TrailerModal.jsx";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.favoriteMovies);

  const dialogRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState("");

  const { id, poster_path, title } = movie;

  const getImageURL = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };

  const addToFavorites = () => {
    dispatch(addFavoriteMovie(id));
  };

  const addToWatchLater = () => {
    console.log("add to watch later");
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
    <div className="movie-card">
      {isDialogOpen && (
        <TrailerModal
          movieTitle={title}
          youtubeVideoId={youtubeVideoId}
          closeModal={setIsDialogOpen}
          ref={dialogRef}
          onClose={closeDialog}
        />
      )}
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
        <button onClick={addToFavorites}>Add to Favorites</button>
        <button onClick={addToWatchLater}>Add to Watch Later</button>
      </div>
    </div>
  );
};

export default MovieCard;
