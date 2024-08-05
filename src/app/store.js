import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import popularMoviesReducer from "../data/moviesSlice";

const store = configureStore({
  reducer: {
    popularMovies: popularMoviesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
