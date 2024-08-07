import { API_URL, BEARER_TOKEN } from "../utils/constants";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${BEARER_TOKEN}`,
  },
};

const getMovieTrailer = async (movieId) => {
  try {
    const response = await fetch(`${API_URL}/movie/${movieId}/videos`, options);
    if (!response.ok) {
      throw new Error("Failed to get Movie Trailer.");
    }
    const data = await response.json();
    const trailer = data.results.find((video) => video.type === "Trailer");
    return trailer ? trailer.key : null;
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    return null;
  }
};

export default getMovieTrailer;
