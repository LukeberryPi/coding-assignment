import { useEffect } from "react";

import { Clock, Film, Search, Star } from "lucide-react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import "./Header.scss";

const Header = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const location = useLocation();
  const navigate = useNavigate();

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
    <header>
      <nav>
        <Link to="/" className="nav-link">
          <div>
            <Film />
          </div>
          <span className="logo-text">Movieland</span>
        </Link>

        <div className="search-container">
          <label htmlFor="search-movies">
            <Search />
          </label>
          <input
            type="search"
            id="search-movies"
            onChange={(e) => searchMovies(e.target.value)}
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-labelledby="search-movies"
          />
        </div>

        <div className="nav-link-container">
          <NavLink className="nav-link" to="/favorite">
            <div>
              <Star />
            </div>
            Favorites
          </NavLink>
          <NavLink className="nav-link" to="/watch-later">
            <div>
              <Clock />
            </div>
            Watch Later
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
