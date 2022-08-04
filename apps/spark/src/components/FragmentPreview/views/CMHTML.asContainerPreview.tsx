import React from "react";
import { Cmhtml } from "@coremedia-labs/graphql-layer";
import StaticCode from "../../StaticCode/StaticCode";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";

const CMHTMLAsContainerPreview: React.FC<IncludeProps<Cmhtml>> = ({ self }) => {
  return <StaticCode code={self.html} />;
};

export default CMHTMLAsContainerPreview;
