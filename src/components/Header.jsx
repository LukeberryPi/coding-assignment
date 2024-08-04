import { Link, NavLink } from "react-router-dom";

import "../styles/header.scss";

const Header = ({ searchMovies }) => {
  return (
    <header>
      <nav>
        <Link to="/" data-testid="logo-button" className="nav-link">
          <i className="bi bi-film" />
          Movieland
        </Link>

        <input
          type="search"
          data-testid="search-movies"
          onChange={(e) => searchMovies(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
        />

        <div className="nav-link-container">
          <NavLink className="nav-link" to="/starred" data-testid="nav-starred">
            <i className="bi bi-star" />
            Favorites
          </NavLink>
          <NavLink className="nav-link" to="/watch-later" data-testid="nav-watch-later">
            <i className="bi bi-clock" />
            Watch Later
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
