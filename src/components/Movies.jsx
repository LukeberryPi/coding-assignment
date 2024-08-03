import Movie from "./Movie";
import "../styles/movies.scss";

const Movies = ({ movies }) => {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
