import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  ACCOUNT_ID,
  API_URL,
  BEARER_TOKEN,
} from "../../shared/utils/constants";

const url = `${API_URL}/account/${ACCOUNT_ID}/favorite`;
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

/**
 * Adds or removes a movie from the Favorite Movies list
 * @param {string} type - "add" | "remove"
 */
const createFavoriteThunk = (type) => {
  const boolMap = {
    add: true,
    remove: false,
  };

  const typePrefixMap = {
    add: "addFavoriteMovie",
    remove: "removeFavoriteMovie",
  };

  return createAsyncThunk(
    `favoriteMovies/${typePrefixMap[type]}`,
    async (movieId, { rejectWithValue }) => {
      try {
        await fetch(url, {
          ...options,
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: boolMap[type],
          }),
        });
        return movieId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
};

export const addFavoriteMovie = createFavoriteThunk("add");
export const removeFavoriteMovie = createFavoriteThunk("remove");

const initialState = {
  favoriteMovies: [],
  status: "idle",
  error: null,
};

const favoriteMoviesSlice = createSlice({
  name: "favoriteMovies",
  initialState,
  reducers: {
    resetFavoriteMovies(state) {
      state.favoriteMovies = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteMovie.fulfilled, (state, action) => {
        state.favoriteMovies.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(addFavoriteMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add favorite movie";
      })
      .addCase(removeFavoriteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavoriteMovie.fulfilled, (state, action) => {
        state.favoriteMovies = state.favoriteMovies.filter(
          (movieId) => movieId !== action.payload,
        );
        state.status = "succeeded";
      })
      .addCase(removeFavoriteMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove favorite movie";
      });
  },
});

export const { resetFavoriteMovies } = favoriteMoviesSlice.actions;
export default favoriteMoviesSlice.reducer;
