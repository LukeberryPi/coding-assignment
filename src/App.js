import { useEffect } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./modules/header/Header.jsx";
import MovieGrid from "./shared/components/movieGrid/MovieGrid.jsx";
import { moviesMock } from "./shared/movies.mocks.js";
import "./app.scss";
import { useDispatch, useSelector } from "react-redux";
import { getPopularMovies } from "./data/moviesSlice";

const App = () => {
  const dispatch = useDispatch();
  const { movies, status, error } = useSelector((state) => state.popularMovies);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const location = useLocation();
  const navigate = useNavigate();

  const starredMovies = moviesMock;
  const watchLaterMovies = moviesMock;

  useEffect(() => {
    dispatch(getPopularMovies());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery && location.pathname !== "/search") {
      navigate(`/search?q=${searchQuery}`);
    }
  }, [searchQuery, navigate, location.pathname]);

  const searchMovies = (query) => {
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    } else {
      navigate("/");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Header searchMovies={searchMovies} />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <MovieGrid
                title="Popular Movies"
                emptyStateMessage="There are no popular movies to show."
                movies={movies}
              />
            }
          />
          <Route
            path="/search"
            element={
              <MovieGrid
                title={`Search: ${searchQuery}`}
                emptyStateMessage="No movies matched your search. Try searching for something else."
                movies={starredMovies}
              />
            }
          />
          <Route
            path="/favorite"
            element={
              <MovieGrid
                title="Starred Movies"
                emptyStateMessage="You have no Starred Movies. You can star movies on the home page."
                movies={starredMovies}
              />
            }
          />
          <Route
            path="/watch-later"
            element={
              <MovieGrid
                title="Watch Later Movies"
                movies={watchLaterMovies}
                emptyStateMessage="You have no movies saved to Watch Later. You can add some on the home page."
              />
            }
          />
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
