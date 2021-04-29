import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Collection } from "../../../queries/fragments/__generated__/Collection";
import Include from "../../../utils/ViewDispatcher/Include";

const CMCollectionBannerGridItem: React.FC<IncludeProps<Collection>> = ({ self, params }) => {
  return (
    <>
      {self.items &&
        self.items.map((item, index) => {
          return item && <Include self={item} key={index} view={"_gridItem"} params={{ ...params }} />;
        })}
    </>
  );
};

export default CMCollectionBannerGridItem;
