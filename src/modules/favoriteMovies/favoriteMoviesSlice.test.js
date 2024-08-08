import { configureStore } from "@reduxjs/toolkit";

import favoriteMoviesReducer, {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "./favoriteMoviesSlice";

global.fetch = jest.fn();

describe("favorite movies slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { favoriteMovies: favoriteMoviesReducer },
    });
  });

  it("should handle initial state", () => {
    expect(favoriteMoviesReducer(undefined, { type: "unknown" })).toEqual({
      favoriteMovies: [],
      status: "idle",
      error: null,
    });
  });

  it("should handle addFavoriteMovie.fulfilled", async () => {
    const movie = { id: 1, title: "Test Movie" };

    global.fetch.mockResolvedValueOnce({ ok: true });
    await store.dispatch(addFavoriteMovie(movie));

    const state = store.getState().favoriteMovies;
    expect(state.favoriteMovies).toContainEqual(movie);
    expect(state.status).toBe("succeeded");
  });

  it("should handle removeFavoriteMovie.fulfilled", async () => {
    const movie = { id: 1, title: "Test Movie" };

    global.fetch.mockResolvedValueOnce({ ok: true });
    await store.dispatch(addFavoriteMovie(movie));

    global.fetch.mockResolvedValueOnce({ ok: true });
    await store.dispatch(removeFavoriteMovie(movie));

    const state = store.getState().favoriteMovies;
    expect(state.favoriteMovies).not.toContainEqual(movie);
    expect(state.status).toBe("succeeded");
  });

  it("should handle addFavoriteMovie.rejected", async () => {
    const movie = { id: 1, title: "Test Movie" };
    global.fetch.mockRejectedValueOnce(new Error("API Error"));

    await store.dispatch(addFavoriteMovie(movie));

    const state = store.getState().favoriteMovies;
    expect(state.status).toBe("failed");
    expect(state.error).toBe("API Error");
  });
});
