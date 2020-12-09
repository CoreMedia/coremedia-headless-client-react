import React, { FC, useState } from "react";
import { useSiteContextState } from "../../context/SiteContextProvider";
import Link from "../Link/Link";
import Navigation from "../Navigation/Navigation";
import HeaderSearchForm from "../Search/HeaderSearchForm";
import "./Header.scss";

const Header: FC = () => {
  const { rootSegment } = useSiteContextState();
  const [toggled, setToggeled] = useState(false);
  return (
    <header id="cm-header" className="cm-header">
      <div className="cm-header__wrapper">
        <button
          type="button"
          onClick={() => {
            setToggeled(!toggled);
          }}
          className={
            "" + toggled !== undefined && toggled
              ? "cm-hamburger-icon--toggled cm-header__mobile-navigation-button cm-hamburger-icon"
              : "cm-header__mobile-navigation-button cm-hamburger-icon"
          }
        >
          <span className="cm-hamburger-icon__bar1" />
          <span className="cm-hamburger-icon__bar2" />
          <span className="cm-hamburger-icon__bar3" />
        </button>
        <Link className="cm-header__logo cm-logo" to={"/" + rootSegment} title="Home">
          <span className="cm-hidden">Home</span>
        </Link>
        <ul id="navbar" className="cm-header__navigation">
          <Navigation />
          <li className="cm-header__divider" />
          {/*<LanguageChooser />*/}
          <HeaderSearchForm />
        </ul>
      </div>
    </header>
  );
};

export default Header;
