import React, { FC } from "react";
import Link from "../Link/Link";
import NavigationItem from "./NavigationItem";
import { metaDataProperty } from "../../utils/Preview/MetaData";
import Image from "../Media/Image";
import { Navigation } from "../../models/Navigation/Navigation";

interface Props extends Navigation {
  depth: number;
  isTopLevel: boolean;
}

const NavigationItemWithPicture: FC<Props> = ({ linkTarget, title, picture, depth, isTopLevel, metadata }) => {
  return (
    <NavigationItem linkTarget={linkTarget} title={title} depth={depth} isTopLevel={isTopLevel} metadata={metadata}>
      {picture && depth === 2 && (
        <Link to={linkTarget} className="cm-navigation-item__picture-link">
          <div className={`cm-navigation-item__picture`} {...metaDataProperty(metadata?.properties?.picture)}>
            <Image picture={picture} width={208} cropName={"landscape_ratio16x9"} />
          </div>
        </Link>
      )}
    </NavigationItem>
  );
};
export default NavigationItemWithPicture;
