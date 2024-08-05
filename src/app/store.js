import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import popularMoviesReducer from "../data/moviesSlice";
import favoriteMoviesReducer from "../modules/favoriteMovies/favoriteMoviesSlice";
import watchLaterMoviesReducer from "../modules/watchLaterMovies/watchLaterMoviesSlice";

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    favoriteMovies: favoriteMoviesReducer,
    watchLaterMovies: watchLaterMoviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
