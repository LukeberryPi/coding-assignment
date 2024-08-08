import React from "react";

import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./app/store";

const renderWithRouterAndRedux = (ui, { route = "/" } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </Provider>,
  );
};

test("renders Header component", () => {
  renderWithRouterAndRedux(<App />);
  expect(screen.getByRole("banner")).toBeInTheDocument();
});

test("renders PopularMoviesPage on default route", () => {
  renderWithRouterAndRedux(<App />);
  expect(screen.getByTestId("popular-movies-page")).toBeInTheDocument();
});

test("renders SearchMoviesPage on /search route", () => {
  renderWithRouterAndRedux(<App />, { route: "/search" });
  expect(screen.getByTestId("search-movies-page")).toBeInTheDocument();
});

test("renders FavoriteMoviesPage on /favorite route", () => {
  renderWithRouterAndRedux(<App />, { route: "/favorite" });
  expect(screen.getByTestId("favorite-movies-page")).toBeInTheDocument();
});

test("renders WatchLaterPage on /watch-later route", () => {
  renderWithRouterAndRedux(<App />, { route: "/watch-later" });
  expect(screen.getByTestId("watch-later-page")).toBeInTheDocument();
});

test('renders "Page Not Found" for unknown route', () => {
  renderWithRouterAndRedux(<App />, { route: "/unknown" });
  expect(screen.getByText("Page Not Found")).toBeInTheDocument();
});
