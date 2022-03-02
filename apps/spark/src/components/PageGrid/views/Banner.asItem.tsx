import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";

const BannerAsItem: React.FC<IncludeProps> = ({ self }) => {
  return <Include self={self} view={"asHeroBanner"} />;
};

export default BannerAsItem;
