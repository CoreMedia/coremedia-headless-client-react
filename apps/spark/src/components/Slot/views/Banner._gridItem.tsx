import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";

const BannerGridItem: React.FC<IncludeProps<Dispatchable>> = ({ self, params }) => {
  return (
    <div className={`cm-slot__item`}>
      {params && <Include self={self} view={(params.includeView as string) || ""} />}
    </div>
  );
};

export default BannerGridItem;
