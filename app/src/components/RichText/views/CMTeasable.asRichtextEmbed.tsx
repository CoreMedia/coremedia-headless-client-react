import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";

const CMTeasableAsRichtextEmbed: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  return (
    <div className={"cm-richtext-embedded cm-richtext-embedded--teasable"}>
      <Include self={self} view={"asLeftRightBanner"} />
    </div>
  );
};
export default CMTeasableAsRichtextEmbed;
