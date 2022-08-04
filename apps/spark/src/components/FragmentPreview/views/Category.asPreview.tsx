import React from "react";
import { Redirect } from "react-router-dom";
import { CategoryDetailFragment } from "@coremedia-labs/graphql-layer";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { getLink } from "../../../utils/Link/LinkUtils";
import { useSiteContextState } from "../../../context/SiteContextProvider";

const CategoryAsPreview: React.FC<IncludeProps<CategoryDetailFragment>> = ({ self }) => {
  const { rootSegment } = useSiteContextState();

  return <Redirect to={getLink(self, rootSegment).linkTarget || ""} />;
};

export default CategoryAsPreview;
