import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import moviesSlice from "../../data/popularMoviesSlice";
import favoriteMoviesSlice from "../../modules/favoriteMovies/favoriteMoviesSlice";
import watchLaterMoviesSlice from "../../modules/watchLaterMovies/watchLaterMoviesSlice";

// @Todo: update to configureTestStore @claude
export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        popularMovies: moviesSlice.reducer,
        favorite: favoriteMoviesSlice.reducer,
        watchLater: watchLaterMoviesSlice.reducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {},
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
