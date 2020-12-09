import React from "react";
import { Redirect } from "react-router-dom";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Linkable } from "../../../queries/fragments/__generated__/Linkable";
import { createHref } from "../../../utils/Link/LinkUtils";

const CMChannel: React.FC<IncludeProps<Linkable>> = ({ self }) => {
  return <Redirect to={createHref(self as Linkable) || ""} />;
};

export default CMChannel;
