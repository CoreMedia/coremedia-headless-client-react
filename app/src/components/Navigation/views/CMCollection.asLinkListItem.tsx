import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import NavigationItem, { initializeAndConvertParams } from "../NavigationItem";
import NavigationItemWithItems from "../NavigationItemWithItems";
import { initializeNavigationFromCollection, Navigation } from "../../../models/Navigation/Navigation";

const CMCollectionAsLinkListItem: React.FC<IncludeProps<Collection>> = ({ self, params }) => {
  const navigation: Navigation = initializeNavigationFromCollection(self);
  const depth: number = params?.depth !== undefined ? Number(params?.depth) + 1 : 1;
  const isTopLevel: boolean = (params?.isTopLevel !== undefined ? params?.isTopLevel : true) as boolean;
  if (depth <= 2) {
    if (self.items?.length === 1 || self.teaserTitle === undefined) {
      const item: Dispatchable | null = self.items && self.items[0];
      return (
        item && (
          <Include
            self={item}
            view={"asLinkListItem"}
            params={{
              isTopLevel: isTopLevel,
              depth: depth - 1,
            }}
          />
        )
      );
    } else if (Number(self.items?.length) > 1) {
      return <NavigationItemWithItems {...navigation} {...initializeAndConvertParams(params)} />;
    } else if (self.teaserTitle !== undefined) {
      return <NavigationItem {...navigation} {...initializeAndConvertParams(params)} />;
    }
  }
  return null;
};

export default CMCollectionAsLinkListItem;
