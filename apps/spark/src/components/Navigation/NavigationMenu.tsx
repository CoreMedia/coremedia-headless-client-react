import React, { FC } from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Include from "../../utils/ViewDispatcher/Include";
import { AdditionalIncludeParams } from "../../utils/ViewDispatcher/IncludeProps";
import { Navigation } from "../../models/Navigation/Navigation";

export const initializeAndConvertParams = (params?: AdditionalIncludeParams) => {
  return (
    params && {
      depth: params?.depth ? Number(params?.depth) : 0,
      maxDepth: params?.maxDepth ? Number(params?.maxDepth) : 0,
    }
  );
};

interface Props extends Navigation {
  depth?: number;
  isTopLevel?: boolean;
  maxDepth?: number;
}

const NavigationMenu: FC<Props> = ({
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
  maxDepth -= 1;

  return (
    <>
      {items && (
        <ul className="cm-navigation-item__menu" {...metaDataProperty("children")}>
          {depth <= 1 && (
            <li className="cm-navigation-item__menu-label" {...metaDataElement(metadata?.root)}>
              <Link to={linkTarget} className={"cm-navigation-item__title"}>
                {title}
              </Link>
            </li>
          )}
          {items &&
            items.map((child, index) => {
              return (
                child && (
                  <Include
                    self={child}
                    view={"asLinkListItem"}
                    key={index}
                    params={{
                      isTopLevel: isTopLevel,
                      depth: depth,
                      maxDepth: maxDepth,
                    }}
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
