import { useEffect, useState } from "react";

export const useInfiniteScroll = () => {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      const reachedBottom = scrollTop + clientHeight >= scrollHeight;
      setHasReachedBottom(reachedBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasReachedBottom]);

  return { hasReachedBottom };
};
