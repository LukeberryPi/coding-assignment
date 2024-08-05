import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favoriteMovies: [],
  },
  reducers: {
    starMovie: (state, action) => {
      state.favoriteMovies = [action.payload, ...state.favoriteMovies];
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.favoriteMovies.findIndex(
        (key) => key.id === action.payload.id,
      );
      state.favoriteMovies.splice(indexOfId, 1);
    },
    clearAllFavorites: (state) => {
      state.favoriteMovies = [];
    },
  },
});

export default favoriteSlice;
