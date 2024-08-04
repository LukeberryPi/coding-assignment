import { useEffect } from "react";
import {
  Routes,
  Route,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
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

  return (
    <>
      <Header searchMovies={searchMovies} />
      <Routes>
        <Route path="/" element={<Movies movies={movies} />} />
        <Route path="/search" element={<Movies movies={movies} />} />
        <Route path="/starred" element={<Starred movies={movies} />} />
        <Route path="/watch-later" element={<WatchLater movies={movies} />} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;
