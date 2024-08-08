import React from "react";

import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import popularMoviesSliceReducer from "../../modules/popularMovies/popularMoviesSlice";
import favoriteMoviesSliceReducer from "../../modules/favoriteMovies/favoriteMoviesSlice";
import watchLaterMoviesSliceReducer from "../../modules/watchLaterMovies/watchLaterMoviesSlice";

const configureTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      popularMovies: popularMoviesSliceReducer,
      favorite: favoriteMoviesSliceReducer,
      watchLater: watchLaterMoviesSliceReducer,
    },
    preloadedState,
  });
};

export function renderWithProviders(
  ui,
  { preloadedState = {}, store = configureTestStore(preloadedState), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export { configureTestStore };