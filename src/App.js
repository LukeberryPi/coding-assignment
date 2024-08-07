import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import FavoriteMoviesPage from "./modules/favoriteMovies/FavoriteMovies.page.jsx";
import Header from "./shared/components/header/Header.jsx";
import PopularMoviesPage from "./modules/popularMovies/PopularMovies.page.jsx";
import SearchMoviesPage from "./modules/searchMovies/SearchMovies.page.jsx";
import WatchLaterPage from "./modules/watchLaterMovies/WatchLaterMovies.page.jsx";
import { getPopularMovies } from "./modules/popularMovies/popularMoviesSlice.js";
import { getFavoriteMovies } from "./modules/favoriteMovies/favoriteMoviesSlice.js";
import { getWatchLaterMovies } from "./modules/watchLaterMovies/watchLaterMoviesSlice.js";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getFavoriteMovies());
    dispatch(getWatchLaterMovies());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PopularMoviesPage />} />
        <Route path="/search" element={<SearchMoviesPage />} />
        <Route path="/favorite" element={<FavoriteMoviesPage />} />
        <Route path="/watch-later" element={<WatchLaterPage />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
