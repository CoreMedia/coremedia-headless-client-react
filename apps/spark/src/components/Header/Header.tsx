import React, { FC, useState } from "react";
import styled from "styled-components";
import { useSiteContextState } from "../../context/SiteContextProvider";
import Link from "../Link/Link";
import Navigation, { StyledNavigation } from "../Navigation/Navigation";
import HeaderSearchForm from "../Search/HeaderSearchForm";

import HeaderCart from "../Cart/HeaderCart";
import SparkLogo from "./assets/logo.svg";
import LanguageChooser from "./LanguageChooser";
import Hamburger from "./Hamburger";

const StyledHeader = styled.header`
  position: relative;
  margin: 0;
  width: 100%;
  z-index: 3;

  &:before {
    content: "";
    display: block;
    height: 70px;
    position: absolute;
    width: 100%;
    box-shadow: inset 0 -1px 0 0 var(--color-background-light-grey);
    left: 0;
    top: 0;
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    padding-bottom: 60px;
  }
`;

const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  height: 70px;
  margin-left: auto;
  margin-right: auto;
  font-family: var(--font-family-text);
  padding: 0 var(--grid-gap);
  max-width: var(--screen-size-max);
`;

const Logo = styled(Link)`
  margin: 0 auto;
  transform: translateX(-22px); // 50% of the mobile button

  background: url("${SparkLogo}") no-repeat center center transparent;
  width: 120px;
  height: 40px;
  background-size: contain;

  > span {
    display: none;
  }

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    margin-left: 0;
    transform: none;
  }
`;

const Divider = styled.li`
  border-top: 1px solid #fff;
  margin: 0 15px;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: none;
  }
`;

const NavBar = styled.ul`
  position: absolute;
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-direction: column;
  background-color: var(--color-background-dark);
  color: #fff;
  top: 100%;
  left: 0;
  right: 0;
  height: calc(100vh - 100%);
  text-align: center;
  z-index: 100;
  overflow-y: auto;
  border-top: 1px solid #fff;

  @media screen and (min-width: 768px) and (orientation: landscape), screen and (min-width: 1200px) {
    display: flex;
    position: static;
    top: auto;
    left: auto;
    right: auto;
    height: auto;
    text-align: left;
    z-index: auto;
    background-color: transparent;
    color: inherit;
    flex-direction: row;
    flex-wrap: wrap;
    overflow-y: visible;
    order: 2;
    border-top: 0;

    & > ${StyledNavigation} {
      background-color: #fff;
      top: calc(100% + 1px);
    }
  }
`;

const Header: FC = () => {
  const [toggled, setToggeled] = useState(false);
  const { rootSegment } = useSiteContextState();
  return (
    <StyledHeader>
      <HeaderWrapper>
        <Hamburger
          toggled={toggled}
          clickHandler={() => {
            setToggeled(!toggled);
          }}
        />
        <Logo to={"/" + rootSegment} title="Home">
          <span>Home</span>
        </Logo>
        <NavBar style={toggled ? { display: "flex" } : {}}>
          <Navigation />
          <Divider />
          <LanguageChooser />
          <HeaderSearchForm />
          <HeaderCart />
        </NavBar>
      </HeaderWrapper>
    </StyledHeader>
  );
};

export default Header;
