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
        width: "180px",
        padding: "10px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <img
        style={{ width: "160px", height: "240px" }}
        src={getImageURL(poster_path)}
        alt="movie poster"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <p style={{ color: "black" }}>{title}</p>
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <button onClick={addToFavorites}>add to favorites</button>
        <button onClick={addToWatchLater}>add to watch later</button>
      </div>
    </div>
  );
};

export default MovieCard;
