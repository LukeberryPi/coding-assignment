import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import favoriteMoviesReducer from "../modules/favoriteMovies/favoriteMoviesSlice";
import popularMoviesReducer from "../modules/popularMovies/popularMoviesSlice";
import watchLaterMoviesReducer from "../modules/watchLaterMovies/watchLaterMoviesSlice";
import searchMoviesReducer from "../modules/searchMovies/searchMoviesSlice";
import infiniteScrollReducer from "../shared/hooks/infiniteScrollSlice";

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
    favoriteMovies: favoriteMoviesReducer,
    watchLaterMovies: watchLaterMoviesReducer,
    searchedMovies: searchMoviesReducer,
    infiniteScroll: infiniteScrollReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;