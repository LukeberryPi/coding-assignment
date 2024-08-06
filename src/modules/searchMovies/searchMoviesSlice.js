import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL, BEARER_TOKEN } from "../../shared/utils/constants";

export const searchMovies = createAsyncThunk(
  "searchMovies/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/search/movie?query=${encodeURIComponent(query)}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        },
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  searchMovies: [],
  status: "idle",
  error: null,
};

const searchMoviesSlice = createSlice({
  name: "searchMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.searchMovies = action.payload;
        state.status = "succeeded";
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to search movies";
      });
  },
});

export default searchMoviesSlice.reducer;
