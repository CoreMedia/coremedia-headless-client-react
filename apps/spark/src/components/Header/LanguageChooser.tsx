import React, { useState } from "react";
import { useSiteContextState } from "../../context/SiteContextProvider";
import Link from "../Link/Link";
import { getGlobalState } from "../../utils/App/GlobalState";

import "./LanguageChooser.scss";
import SeoHeader from "./SeoHeader";

const LanguageChooser: React.FC = () => {
  const { localizedVariants } = useSiteContextState();
  const { rootSegment } = getGlobalState();
  const [clicked, setClicked] = useState(false);

  if (!localizedVariants || localizedVariants.length < 2) {
    return null;
  }
  const me = localizedVariants.filter((item) => {
    return item.segment === rootSegment;
  })[0];

  return (
    <>
      <SeoHeader
        alternate={localizedVariants.filter((item) => {
          return item.locale !== me.locale;
        })}
      />
      {localizedVariants && localizedVariants.length > 1 && me.locale && (
        <li
          className={`cm-header__language-chooser cm-navigation-item cm-navigation-item--depth-1 cm-navigation-item--special-depth-1${
            clicked ? " cm-navigation-item--open" : ""
          }`}
          onClick={() => {
            setClicked(!clicked);
          }}
        >
          <span className="cm-navigation-item__title">{me.locale}</span>
          <button type="button" className="cm-navigation-item__toggle" aria-haspopup="true" />
          <ul id="localizationMenu" className="cm-navigation-item__menu">
            {localizedVariants.map((item, index) => {
              return (
                item !== me &&
                me.locale &&
                item.locale && (
                  <li
                    key={index}
                    className="cm-navigation-item cm-navigation-item--depth-2 cm-navigation-item--special-depth-2"
                  >
                    <Link to={item} className="cm-navigation-item__title">
                      {item.locale}
                    </Link>
                  </li>
                )
              );
            })}
          </ul>
        </li>
      )}
    </>
  );
};

export default LanguageChooser;
