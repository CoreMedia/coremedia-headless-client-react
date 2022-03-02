import React, { FC } from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import { NavigationProps } from "../../models/Navigation/Navigation";
import NavigationItem from "./NavigationItem";

const NavigationMenu: FC<NavigationProps> = ({
  linkTarget,
  items,
  title,
  depth = 0,
  isTopLevel = true,
  maxDepth = 0,
  metadata = {},
}) => {
  if (maxDepth < 0) {
    return null;
  }
  return (
    <>
      {items && (
        <ul className="cm-navigation-item__menu" {...metaDataProperty("children")}>
          {depth <= 1 && (
            <li className="cm-navigation-item__menu-label" {...metaDataElement(metadata?.root)}>
              {linkTarget && (
                <Link to={linkTarget} className={"cm-navigation-item__title"}>
                  {title}
                </Link>
              )}
              {!linkTarget && <span className={"cm-navigation-item__title"}>{title}</span>}
            </li>
          )}
          {items &&
            items.map((child, index) => {
              return (
                child && (
                  <NavigationItem
                    key={index}
                    depth={depth + 1}
                    isTopLevel={isTopLevel}
                    maxDepth={maxDepth - 1}
                    {...child}
                  />
                )
              );
            })}
        </ul>
      )}
    </>
  );
};
export default NavigationMenu;
