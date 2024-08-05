import favoriteSlice from "../data/favoriteSlice";
import { moviesMock } from "../../shared/mocks/movies.mocks";

describe("favoriteSlice test", () => {
  const state = { favoriteMovies: [] };

  it("should set an initial state", () => {
    const initialState = state;
    const action = { type: "" };
    const result = favoriteSlice.reducer(initialState, action);
    expect(result).toEqual({ favoriteMovies: [] });
  });

  it("should add movie to favorite", () => {
    const initialState = { ...state, favoriteMovies: [] };
    const action = favoriteSlice.actions.starMovie(moviesMock[0]);
    const result = favoriteSlice.reducer(initialState, action);
    expect(result.favoriteMovies[0]).toBe(moviesMock[0]);
  });

  it("should remove movie from favorite", () => {
    const initialState = { ...state, favoriteMovies: moviesMock };
    const action = favoriteSlice.actions.unstarMovie(moviesMock[0]);
    const result = favoriteSlice.reducer(initialState, action);
    expect(result.favoriteMovies[0]).toBe(moviesMock[1]);
  });

  it("should remove all movies", () => {
    const initialState = { ...state, favoriteMovies: moviesMock };
    const action = favoriteSlice.actions.clearAllFavorites(state);
    const result = favoriteSlice.reducer(initialState, action);
    expect(Object.keys(result.favoriteMovies).length).toEqual(0);
  });
});
