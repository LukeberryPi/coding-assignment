import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "../data/moviesSlice";
import starredSlice from "../modules/starred-movies/starredSlice";
import watchLaterSlice from "../modules/watch-later/watchLaterSlice";

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
  },
});

export default store;
