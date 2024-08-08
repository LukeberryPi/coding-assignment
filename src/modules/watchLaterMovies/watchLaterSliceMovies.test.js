import { configureStore } from "@reduxjs/toolkit";

import watchLaterMoviesReducer, {
  addWatchLaterMovie,
  removeWatchLaterMovie,
} from "./watchLaterMoviesSlice";

global.fetch = jest.fn();

describe("watch later movies slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { watchLaterMovies: watchLaterMoviesReducer },
    });
  });

  it("should handle initial state", () => {
    expect(watchLaterMoviesReducer(undefined, { type: "unknown" })).toEqual({
      watchLaterMovies: [],
      status: "idle",
      error: null,
    });
  });

  it("should handle addWatchLaterMovie.fulfilled", async () => {
    const movie = { id: 1, title: "Test Movie" };

    global.fetch.mockResolvedValueOnce({ ok: true });
    await store.dispatch(addWatchLaterMovie(movie));

    const state = store.getState().watchLaterMovies;
    expect(state.watchLaterMovies).toContainEqual(movie);
    expect(state.status).toBe("succeeded");
  });

  it("should handle removeWatchLaterMovie.fulfilled", async () => {
    const movie = { id: 1, title: "Test Movie" };

    global.fetch.mockResolvedValueOnce({ ok: true });
    await store.dispatch(addWatchLaterMovie(movie));

    global.fetch.mockResolvedValueOnce({ ok: true });
    await store.dispatch(removeWatchLaterMovie(movie));

    const state = store.getState().watchLaterMovies;
    expect(state.watchLaterMovies).not.toContainEqual(movie);
    expect(state.status).toBe("succeeded");
  });

  it("should handle addWatchLaterMovie.rejected", async () => {
    const movie = { id: 1, title: "Test Movie" };
    global.fetch.mockRejectedValueOnce(new Error("API Error"));

    await store.dispatch(addWatchLaterMovie(movie));

    const state = store.getState().watchLaterMovies;
    expect(state.status).toBe("failed");
    expect(state.error).toBe("API Error");
  });
});
