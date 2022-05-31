import React from "react";
import { Redirect } from "react-router-dom";
import { Linkable } from "@coremedia-labs/graphql-layer";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { getLink } from "../../../utils/Link/LinkUtils";
import { usePreviewContextState } from "../../../context/PreviewContextProvider";
import { isPreview } from "../../../utils/Preview/Preview";
import { useSiteContextState } from "../../../context/SiteContextProvider";

const CMChannel: React.FC<IncludeProps<Linkable>> = ({ self }) => {
  const { previewDate } = usePreviewContextState();
  const { rootSegment } = useSiteContextState();

  let params = {};
  if (isPreview() && previewDate) {
    params = {
      previewDate: previewDate,
    };
  }
  return <Redirect to={getLink(self, rootSegment, params).linkTarget || ""} />;
};

export default CMChannel;
