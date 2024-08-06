import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import favoriteMoviesReducer from "../modules/favoriteMovies/favoriteMoviesSlice";
import popularMoviesReducer from "../modules/popularMovies/popularMoviesSlice";
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
