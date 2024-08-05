import { createSlice } from "@reduxjs/toolkit";

const starredSlice = createSlice({
  name: "favorite",
  initialState: {
    starredMovies: [],
  },
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [action.payload, ...state.starredMovies];
    },
    unstarMovie: (state, action) => {
      const indexOfId = state.starredMovies.findIndex(
        (key) => key.id === action.payload.id,
      );
      state.starredMovies.splice(indexOfId, 1);
    },
    clearAllStarred: (state) => {
      state.starredMovies = [];
    },
  },
});

export default starredSlice;
