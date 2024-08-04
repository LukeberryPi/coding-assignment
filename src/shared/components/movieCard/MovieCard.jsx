const MovieCard = ({ movie }) => {
  const { id, overview, poster_path, release_date, title } = movie;

  const getImageURL = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`;
  };

  const addToFavorites = () => {
    console.log("add to favorites");
  };

  const addToWatchLater = () => {
    console.log("add to watch later");
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "fit-content",
        padding: "10px",
      }}
    >
      <img
        style={{ width: "160px", height: "240px" }}
        src={getImageURL(poster_path)}
        alt="movie poster"
      />
      <p>{title}</p>
      <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <button onClick={addToFavorites}>add to favorites</button>
        <button onClick={addToWatchLater}>add to watch later</button>
      </div>
    </div>
  );
};

export default MovieCard;
