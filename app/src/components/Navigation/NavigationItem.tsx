import React, { FC, useState } from "react";
import Link from "../Link/Link";
import { metaDataElement } from "../../utils/Preview/MetaData";
import { AdditionalIncludeParams } from "../../utils/ViewDispatcher/IncludeProps";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { formatSegmentForUrl } from "../../utils/Link/LinkUtils";

import "./Navigation.scss";
import { Navigation } from "../../models/Navigation/Navigation";

export const initializeAndConvertParams = (params?: AdditionalIncludeParams) => {
  return {
    depth: (params?.depth !== undefined ? Number(params?.depth) + 1 : 1) as number,
    isTopLevel: (params?.isTopLevel !== undefined ? params?.isTopLevel : true) as boolean,
    maxDepth: (params?.maxDepth ? Number(params?.maxDepth) : -1) as number,
  };
};

interface Props extends Navigation {
  depth: number;
  isTopLevel: boolean;
}

const NavigationItem: FC<Props> = ({ linkTarget, title, depth, isTopLevel, children, metadata = {} }) => {
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
      {children}
    </li>
  );
};
export default NavigationItem;
