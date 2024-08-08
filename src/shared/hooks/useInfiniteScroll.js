import { useEffect, useState } from "react";

export const useInfiniteScroll = () => {
  const [hasReachedBottom, setHasReachedBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setHasReachedBottom(scrollTop + clientHeight >= scrollHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { hasReachedBottom };
};
