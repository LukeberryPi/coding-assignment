import { useState, useEffect } from "react";

import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Clock, Film, Search, Star } from "lucide-react";

import useDebounce from "../../hooks/useDebounce";
import "./Header.scss";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery || "", 600);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (debouncedSearchQuery) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearchQuery)}`);
    } else if (location.pathname === "/search" && !searchQuery) {
      navigate("/");
    }
  }, [debouncedSearchQuery, navigate, location.pathname, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (path) => {
    // @Todo: it only reroutes after debounce, should be instant
    setSearchQuery("");
    navigate(path);
  };

  return (
    <header>
      <nav>
        <Link to="/" className="nav-link" onClick={() => handleNavigation("/")}>
          <Film />
          <span className="logo-text">Movieland</span>
        </Link>

        <div className="search-container">
          <label htmlFor="search-movies">
            <Search />
          </label>
          <input
            type="search"
            id="search-movies"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-labelledby="search-movies"
          />
        </div>

        <div className="nav-link-container">
          <NavLink
            className="nav-link"
            to="/favorite"
            onClick={() => handleNavigation("/favorite")}
          >
            <Star />
            <span>Favorites</span>
          </NavLink>
          <NavLink
            className="nav-link"
            to="/watch-later"
            onClick={() => handleNavigation("/watch-later")}
          >
            <Clock />
            <span>Watch Later</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;