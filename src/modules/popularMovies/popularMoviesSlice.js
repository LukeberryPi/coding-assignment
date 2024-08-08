import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL, BEARER_TOKEN } from "../../shared/utils/constants";

export const getPopularMovies = createAsyncThunk(
  "popularMovies/getPopularMovie",
  async (pageParam = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/discover/movie?page=${pageParam}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data = await response.json();
      const { results, total_pages: totalPages, page } = data;
      return { results, totalPages, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  popularMovies: [],
  totalPages: null,
  currentPage: 1,
  hasMore: true,
  status: "idle",
  error: null,
};

const popularMoviesSlice = createSlice({
  name: "popularMovies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularMovies = [
          ...state.popularMovies,
          ...action.payload.results,
        ];
        state.currentPage = action.payload.page;
        if (state.totalPages !== action.payload.totalPages) {
          state.totalPages = action.payload.totalPages;
        }
        state.hasMore = state.currentPage < state.totalPages;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch popular movies";
      });
  },
});

export default popularMoviesSlice.reducer;
