import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BEARER_TOKEN, API_URL } from "../utils/constants";

export const getMoreMovies = createAsyncThunk(
  "infiniteScroll/getMoreMovies",
  async (pageParam, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/movie/popular?page=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${BEARER_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Failed to get more movies.`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const infiniteScrollSlice = createSlice({
  name: "infiniteScroll",
  initialState: {
    movies: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMoreMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoreMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = [...state.movies, ...action.payload.results];
        state.page = action.payload.page;
        state.hasMore = action.payload.page < action.payload.total_pages;
        state.error = null;
      })
      .addCase(getMoreMovies.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "An error occurred while fetching movies";
      });
  },
});

export default infiniteScrollSlice.reducer;
