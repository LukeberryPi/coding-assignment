import { useState, useEffect } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { Clock, Film, Search, Star } from "lucide-react";

import "./Header.scss";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  }, [navigate, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleNavigation = (path) => {
    // @Todo: it only reroutes after debounce, should be instant
    setSearchQuery("");
    navigate(path);
  };

  const toggleMobileSearch = () => {
    setMobileSearchOpen((prev) => !prev);
  };

  return (
    <header className="header">
      <nav className="header__nav">
        <Link
          to="/"
          className="header__nav-link"
          onClick={() => handleNavigation("/")}
        >
          <Film />
          <span className="header__nav-logo-text">Movieland</span>
        </Link>

        <div className="header__search-container">
          <label htmlFor="search-movies" className="header__search-label">
            <Search />
          </label>
          <input
            type="search"
            id="search-movies"
            className="header__search-input"
            onChange={handleSearch}
            value={searchQuery}
            placeholder="Search movies..."
            data-mobile-search-open={mobileSearchOpen}
            aria-label="Search movies"
            aria-labelledby="search-movies"
          />
          <button onClick={toggleMobileSearch}>Close</button>
        </div>

        <div className="header__nav-link-container">
          <button
            className="header__search-nav-button"
            onClick={toggleMobileSearch}
          >
            <Search />
          </button>
          <NavLink
            className="header__nav-link"
            to="/favorite"
            onClick={() => handleNavigation("/favorite")}
          >
            <Star />
            <span>Favorites</span>
          </NavLink>
          <NavLink
            className="header__nav-link"
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
