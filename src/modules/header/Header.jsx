import { Link, NavLink } from "react-router-dom";

import "./Header.scss";

const Header = ({ searchMovies }) => {
  return (
    <header>
      <nav>
        <Link to="/" className="nav-link">
          <div>
            <i className="bi bi-film h3" />
          </div>
          <span className="logo-text">Movieland</span>
        </Link>

        <input
          type="search"
          onChange={(e) => searchMovies(e.target.value)}
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-labelledby="search-movies"
        />

        <div className="nav-link-container">
          <NavLink className="nav-link" to="/favorite">
            <div>
              <i className="bi h4 bi-star" />
            </div>
            Favorites
          </NavLink>
          <NavLink className="nav-link" to="/watch-later">
            <div>
              <i className="bi h4 bi-clock" />
            </div>
            Watch Later
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Header;
