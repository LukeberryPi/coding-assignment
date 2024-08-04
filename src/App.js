import { useEffect } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "reactjs-popup/dist/index.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import "./app.scss";
import { moviesMock } from "./test/movies.mocks";

const App = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = searchParams.get("q");
  const movies = moviesMock;

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

  const viewTrailer = () => {
    console.log("view trailer");
  };

  const closeCard = () => {
    console.log("close card");
  };

  return (
    <div className="App">
      <Header searchMovies={searchMovies} />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeCard}
              />
            }
          />
          <Route
            path="/search"
            element={
              <Movies
                movies={movies.filter((movie) =>
                  movie.title
                    .toLowerCase()
                    .includes(searchQuery?.toLowerCase() || ""),
                )}
                viewTrailer={viewTrailer}
                closeCard={closeCard}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
