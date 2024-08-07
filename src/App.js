import { useEffect } from "react";

import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
  useNavigate,
} from "react-router-dom";

import FavoriteMoviesPage from "./modules/favoriteMovies/FavoriteMovies.page.jsx";
import PopularMoviesPage from "./modules/popularMovies/PopularMovies.page.jsx";
import SearchMoviesPage from "./modules/searchMovies/SearchMovies.page.jsx";
import WatchLaterPage from "./modules/watchLaterMovies/WatchLaterMovies.page.jsx";
import Header from "./shared/components/header/Header.jsx";
import useDebounce from "./shared/hooks/useDebounce.js";
import "./app.scss";

const App = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = useDebounce(searchParams.get("q") || "", 800);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery && location.pathname !== "/search") {
      navigate(`/search?q=${searchQuery}`, { replace: true });
    }
  }, [searchQuery, navigate, location.pathname]);

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