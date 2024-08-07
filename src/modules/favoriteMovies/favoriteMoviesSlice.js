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
        const response = await fetch(url, {
          ...options,
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            favorite: boolMap[type],
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${type} favorite movie`);
        }

        return movieId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
};

export const getFavoriteMovies = createAsyncThunk(
  "favoriteMovies/getFavoriteMovies",
  async (rejectWithValue) => {
    try {
      const response = await fetch(
        `${API_URL}/account/${ACCOUNT_ID}/favorite/movies`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Favorite movies");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
      .addCase(getFavoriteMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFavoriteMovies.fulfilled, (state, action) => {
        state.favoriteMovies = action.payload;
        state.status = "succeeded";
      })
      .addCase(getFavoriteMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch Favorite movies";
      })
      .addCase(addFavoriteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addFavoriteMovie.fulfilled, (state, action) => {
        if (!state.favoriteMovies.includes(action.payload.movieId)) {
          state.favoriteMovies.push(action.payload.movieId);
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
          (movieId) => movieId !== action.payload,
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
