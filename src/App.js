import { Routes, Route } from "react-router-dom";

import FavoriteMoviesPage from "./modules/favoriteMovies/FavoriteMovies.page.jsx";
import Header from "./shared/components/header/Header.jsx";
import PopularMoviesPage from "./modules/popularMovies/PopularMovies.page.jsx";
import SearchMoviesPage from "./modules/searchMovies/SearchMovies.page.jsx";
import WatchLaterPage from "./modules/watchLaterMovies/WatchLaterMovies.page.jsx";
import "./app.scss";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<div data-testid="popular-movies-page"><PopularMoviesPage /></div>} />
        <Route path="/search" element={<div data-testid="search-movies-page"><SearchMoviesPage /></div>} />
        <Route path="/favorite" element={<div data-testid="favorite-movies-page"><FavoriteMoviesPage /></div>} />
        <Route path="/watch-later" element={<div data-testid="watch-later-page"><WatchLaterPage /></div>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;