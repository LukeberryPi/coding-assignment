import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { API_URL } from "../../shared/utils/constants";

export const getPopularMovies = createAsyncThunk(
  "popularMovies/getPopularMovie",
  async (pageParam = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_URL}/discover/movie?page=${pageParam}&sort_by=popularity.desc`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_BEARER_TOKEN}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  popularMovies: [],
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
        state.popularMovies = action.payload;
        state.status = "succeeded";
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch popular movies";
      });
  },
});

export default popularMoviesSlice.reducer;
