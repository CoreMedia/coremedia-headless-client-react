import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { PageGridPlacement } from "../../../queries/fragments/__generated__/PageGridPlacement";

const PageGridPlacementAsContainer: React.FC<IncludeProps<PageGridPlacement>> = ({ self }) => {
  return (
    <>
      {self.items &&
        self.items.map((item, index) => {
          return item && <Include self={item} key={index} view={"asItem"} />;
        })}
    </>
  );
};

export default PageGridPlacementAsContainer;
