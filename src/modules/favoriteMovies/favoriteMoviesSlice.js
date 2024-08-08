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
    async (movie, { rejectWithValue }) => {
      try {
        const response = await fetch(url, {
          ...options,
          body: JSON.stringify({
            media_type: "movie",
            media_id: movie.id,
            favorite: boolMap[type],
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${type} favorite movie`);
        }

        return movie;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addFavoriteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteMovie.fulfilled, (state, action) => {
        const isDuplicate = state.favoriteMovies.some(
          (movie) => movie.id === action.payload.id,
        );
        if (!isDuplicate) {
          state.favoriteMovies.push(action.payload);
        }
        state.status = "succeeded";
      })
      .addCase(addFavoriteMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add Favorite movie";
      })
      .addCase(removeFavoriteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFavoriteMovie.fulfilled, (state, action) => {
        state.favoriteMovies = state.favoriteMovies.filter(
          (movie) => movie.id !== action.payload.id,
        );
        state.status = "succeeded";
      })
      .addCase(removeFavoriteMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove Favorite movie";
      });
  },
});

export default favoriteMoviesSlice.reducer;
