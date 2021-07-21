import React from "react";
import { useSiteContextState } from "../../context/SiteContextProvider";
import NavigationMenu from "./NavigationMenu";
import { initializeNavigationFromNavigation } from "../../models/Navigation/Navigation";

const Navigation: React.FC = () => {
  const { navigation } = useSiteContextState();

  return (
    <li id="cm-navigation" className={`cm-navigation`}>
      {navigation && (
        <NavigationMenu {...initializeNavigationFromNavigation(navigation)} maxDepth={3} depth={0} isTopLevel={true} />
      )}
    </li>
  );
};

export default Navigation;
