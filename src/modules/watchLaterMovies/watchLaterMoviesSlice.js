import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  ACCOUNT_ID,
  API_URL,
  BEARER_TOKEN,
} from "../../shared/utils/constants";

const url = `${API_URL}/account/${ACCOUNT_ID}/watchlist`;
const options = {
  method: "POST",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

/**
 * Adds or removes a movie from the Watch Later Movies list
 * @param {string} type - "add" | "remove"
 */
const createWatchLaterThunk = (type) => {
  const boolMap = {
    add: true,
    remove: false,
  };

  const typePrefixMap = {
    add: "addWatchLaterMovie",
    remove: "removeWatchLaterMovie",
  };

  return createAsyncThunk(
    `watchLaterMovies/${typePrefixMap[type]}`,
    async (movieId, { rejectWithValue }) => {
      try {
        await fetch(url, {
          ...options,
          body: JSON.stringify({
            media_type: "movie",
            media_id: movieId,
            watchlist: boolMap[type],
          }),
        });
        return movieId;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    },
  );
};

export const getWatchLaterMovies = createAsyncThunk(
  "watchLaterMovies/getWatchLaterMovies",
  async (rejectWithValue) => {
    try {
      const response = await fetch(
        `${API_URL}/account/${ACCOUNT_ID}/watchlist/movies`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Watch Later movies");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const addWatchLaterMovie = createWatchLaterThunk("add");
export const removeWatchLaterMovie = createWatchLaterThunk("remove");

const initialState = {
  watchLaterMovies: [],
  status: "idle",
  error: null,
};

const watchLaterMoviesSlice = createSlice({
  name: "watchLaterMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWatchLaterMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWatchLaterMovies.fulfilled, (state, action) => {
        state.watchLaterMovies = action.payload;
        state.status = "succeeded";
      })
      .addCase(getWatchLaterMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch Watch Later movies";
      })
      .addCase(addWatchLaterMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWatchLaterMovie.fulfilled, (state, action) => {
        if (!state.watchLaterMovies.includes(action.payload.movieId)) {
          state.watchLaterMovies.push(action.payload.movieId);
        }
        state.status = "succeeded";
      })
      .addCase(addWatchLaterMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to add Watch Later movie";
      })
      .addCase(removeWatchLaterMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeWatchLaterMovie.fulfilled, (state, action) => {
        state.watchLaterMovies = state.watchLaterMovies.filter(
          (movieId) => movieId !== action.payload,
        );
        state.status = "succeeded";
      })
      .addCase(removeWatchLaterMovie.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to remove Watch Later movie";
      });
  },
});

export default watchLaterMoviesSlice.reducer;
