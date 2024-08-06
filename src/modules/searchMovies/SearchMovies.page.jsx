import { useSearchParams } from "react-router-dom";

import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

const SearchMoviesPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  return (
    <>
      <main className="main">
        <MovieGrid
          title={`Search: ${searchQuery}`}
          emptyStateMessage="No movies matched your search. Try searching for something else."
          movies={undefined}
        />
      </main>
    </>
  );
};

export default SearchMoviesPage;
