import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { Collection } from "../../../queries/fragments/__generated__/Collection";

const CMCollectionAsContainer: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return (
    <>
      {self.items &&
        self.items.map((item, index) => {
          return item && <Include self={item} key={index} view={"asItem"} />;
        })}
    </>
  );
};

export default CMCollectionAsContainer;
