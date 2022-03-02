import React, { FC, useState } from "react";
import Link from "../Link/Link";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { formatSegmentForUrl } from "../../utils/Link/LinkUtils";

import "./Navigation.scss";
import { NavigationProps } from "../../models/Navigation/Navigation";
import NavigationMenu from "./NavigationMenu";
import Image from "../Media/Image";

const NavigationItem: FC<NavigationProps> = ({
  linkTarget,
  title,
  depth,
  picture,
  isTopLevel,
  items,
  maxDepth = -1,
  metadata = {},
}) => {
  const [toggled, setToggled] = useState(false);
  const { currentNavigation } = useSiteContextState();
  let classNames = `cm-navigation-item cm-navigation-item--depth-${depth}`;
  toggled !== undefined && toggled && (classNames = `${classNames} cm-navigation-item--open`);
  if (currentNavigation?.indexOf(formatSegmentForUrl(title)) !== -1) {
    classNames = `${classNames} cm-navigation-item--active`;
  }
  return (
    <li className={classNames} {...metaDataElement(metadata.root)}>
      {linkTarget && (
        <Link to={linkTarget} className="cm-navigation-item__title">
          {title}
        </Link>
      )}
      {!linkTarget && <span className="cm-navigation-item__title">{title}</span>}
      {isTopLevel && (
        <button
          type="button"
          className="cm-navigation-item__toggle"
          aria-haspopup="true"
          onClick={() => setToggled(!toggled)}
        />
      )}
      {/*If items are available, render them as navigation menu*/}
      {items && items.length > 0 && (
        <NavigationMenu
          linkTarget={linkTarget}
          items={items}
          picture={picture}
          title={title}
          depth={depth}
          maxDepth={maxDepth}
          isTopLevel={false}
        />
      )}
      {/*no items, a picture and level 2 --> render the picture*/}
      {(!items || items.length === 0) && picture && depth === 2 && (
        <Link to={linkTarget} className="cm-navigation-item__picture-link">
          <div className={`cm-navigation-item__picture`} {...metaDataProperty(metadata?.properties?.picture)}>
            <Image picture={picture} width={208} cropName={"landscape_ratio16x9"} />
          </div>
        </Link>
      )}
    </li>
  );
};
export default NavigationItem;
