import React from "react";
import styled from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import NavigationMenu, { NavigationMenuItem, NavigationMenuItemLabel } from "./NavigationMenu";

export const StyledNavigation = styled.li`
  text-align: center;
  z-index: 2;
  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    background-color: #fff;
    font-size: 12px;
    text-align: center;
    position: absolute;
    z-index: 1;
    left: 0;
    right: 0;

    > ${NavigationMenuItem} {
      display: inline-block;
      position: static;

      > ${NavigationMenuItemLabel}:first-child {
        display: none;
      }

      //.cm-navigation-item.cm-navigation-item--active {
      //  border-bottom-width: 4px !important;
      //}
    }
  }
`;
const Navigation: React.FC = () => {
  const { navigation } = useSiteContextState();

  return (
    <StyledNavigation>
      {navigation && <NavigationMenu {...navigation} maxDepth={3} depth={0} isTopLevel={true} />}
    </StyledNavigation>
  );
};

export default Navigation;
