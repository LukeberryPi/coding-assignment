import { useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getMoreMovies } from "./infiniteScrollSlice";

export const useInfiniteScroll = () => {
  const dispatch = useDispatch();
  const { items, page, hasMore, loading, error } = useSelector(
    (state) => state.infiniteScroll,
  );

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(getMoreMovies(page));
    }
  }, [dispatch, loading, hasMore, page]);

  const hasReachedBottom =
    window.innerHeight + document.documentElement.scrollTop ===
    document.documentElement.offsetHeight;

  useEffect(() => {
    const handleScroll = () => {
      if (hasReachedBottom) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, hasReachedBottom]);

  return { items, loading, error, hasMore };
};
