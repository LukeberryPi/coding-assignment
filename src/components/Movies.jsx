import MovieCard from "./MovieCard";
import "../styles/movies.scss";

const Movies = ({ movies }) => {
  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;
