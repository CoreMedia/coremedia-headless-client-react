import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMHTMLFragment as CMHTMLType } from "@coremedia-labs/graphql-layer";
import CMHTML from "../../CMHTML/CMHTML";

const CMHTMLAsContainerPreview: React.FC<IncludeProps<CMHTMLType>> = ({ self }) => {
  return <CMHTML self={self} />;
};

export default CMHTMLAsContainerPreview;
