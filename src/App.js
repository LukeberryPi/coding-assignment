import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import FavoriteMoviesPage from "./modules/favoriteMovies/FavoriteMovies.page.jsx";
import PopularMoviesPage from "./modules/popularMovies/PopularMovies.page.jsx";
import SearchMoviesPage from "./modules/searchMovies/SearchMovies.page.jsx";
import WatchLaterPage from "./modules/watchLaterMovies/WatchLaterMovies.page.jsx";
import Header from "./shared/components/header/Header.jsx";
import MovieGrid from "./shared/components/movieGrid/MovieGrid.jsx";
import "./App.scss";

const App = () => {
  return (
    <>
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
