import { useEffect } from "react";

import Header from "../../shared/components/header/Header.jsx";
import MovieGrid from "../../shared/components/movieGrid/MovieGrid.jsx";

const SearchMoviesPage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <MovieGrid
          title="Search Results"
          // @Todo: make dynamic with search query
          // title={`Search: ${searchQuery}`}
          emptyStateMessage="No movies matched your search. Try searching for something else."
          movies={[]}
        />
      </main>
    </>
  );
};

export default SearchMoviesPage;
