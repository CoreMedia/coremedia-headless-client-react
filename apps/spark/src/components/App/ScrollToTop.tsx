import React, { useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const path = window.location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);

  return null;
};

export default ScrollToTop;
