import React from "react";
import { CMHTMLFragment as CMHTMLType } from "@coremedia-labs/graphql-layer";
import StaticCode from "../../StaticCode/StaticCode";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";

const CMHTMLAsContainerPreview: React.FC<IncludeProps<CMHTMLType>> = ({ self }) => {
  return <StaticCode code={self.html} />;
};

export default CMHTMLAsContainerPreview;
