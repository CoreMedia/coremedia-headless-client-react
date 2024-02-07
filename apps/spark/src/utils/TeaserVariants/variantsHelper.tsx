import { useMediaQuery } from "react-responsive";

export const useBreakpoints = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1199px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1200px)" });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });
  let type = "mobile";
  if (isDesktop) {
    type = "desktop";
  } else if (isTablet) {
    type = "tablet";
  } else if (isMobile) {
    type = "mobile";
  }
  return {
    isMobile,
    isTablet,
    isDesktop,
    isPortrait,
    isLandscape,
    type,
  };
};
