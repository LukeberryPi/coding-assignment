import { useEffect, useCallback, useState } from "react";

import { useDispatch } from "react-redux";

export const useInfiniteScroll = (actionToDispatch) => {
  const dispatch = useDispatch();
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  if (!(actionToDispatch instanceof Function)) {
    throw new Error("actionToDispatch must be a function");
  }

  useEffect(() => {
    const handleScroll = () => {
      const reachedBottom =
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight;
      setHasReachedBottom(reachedBottom);
      if (hasReachedBottom) {
        dispatch(actionToDispatch());
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, actionToDispatch, hasReachedBottom]);

  return {};
};
