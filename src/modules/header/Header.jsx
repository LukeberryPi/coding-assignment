import { Link, NavLink } from "react-router-dom";

import "./header.scss";

const Header = ({ searchMovies }) => {
  return (
    <header>
      <nav>
        <Link to="/" data-testid="logo-button" className="nav-link">
          <div>
            <i className="bi bi-film h2" />
          </div>
          <span className="logo-text">Movieland</span>
        </Link>

        <input
          type="search"
          data-testid="search-movies"
          onChange={(e) => searchMovies(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-labelledby="search-movies"
        />

        <div className="nav-link-container">
          <NavLink
            className="nav-link"
            to="/favorite"
            data-testid="nav-favorite"
          >
            <i className="bi bi-star" />
            Favorites
          </NavLink>
          <NavLink
            className="nav-link"
            to="/watch-later"
            data-testid="nav-watch-later"
          >
            <i className="bi bi-clock" />
            Watch Later
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
