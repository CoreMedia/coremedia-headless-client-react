import React, { FC } from "react";
import NavigationItem from "./NavigationItem";
import NavigationItemWithPicture from "./NavigationItemWithPicture";
import { Navigation } from "../../models/Navigation/Navigation";
import NavigationMenu from "./NavigationMenu";

interface Props extends Navigation {
  depth: number;
  isTopLevel: boolean;
  maxDepth: number;
}

const NavigationItemWithItems: FC<Props> = ({
  linkTarget,
  title,
  items,
  picture,
  depth,
  isTopLevel,
  maxDepth = -1,
  metadata,
}) => {
  if (items && items.length > 0) {
    return (
      <NavigationItem linkTarget={linkTarget} title={title} depth={depth} isTopLevel={isTopLevel} metadata={metadata}>
        <NavigationMenu
          linkTarget={linkTarget}
          items={items}
          picture={picture}
          title={title}
          depth={depth}
          maxDepth={maxDepth}
          isTopLevel={false}
          metadata={metadata}
        />
      </NavigationItem>
    );
  } else {
    return (
      <NavigationItemWithPicture
        linkTarget={linkTarget}
        picture={picture}
        title={title}
        metadata={metadata}
        depth={depth}
        isTopLevel={false}
      />
    );
  }
};
export default NavigationItemWithItems;
