import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import Include from "../../../utils/ViewDispatcher/Include";

const CMTeasableAsFullPreview: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  return (
    <div className={"cm-grid cm-grid--default"}>
      <div id="cm-placement-main" className={"cm-placement cm-placement--main "}>
        <Include self={self} view={"asDetail"} />
      </div>
    </div>
  );
};

export default CMTeasableAsFullPreview;
