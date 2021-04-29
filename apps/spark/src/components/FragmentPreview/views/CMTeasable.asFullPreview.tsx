import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import Include from "../../../utils/ViewDispatcher/Include";

const CMTeasableAsFullPreview: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  return (
    <div className={"cm-grid cm-grid--default"}>
      <div id="cm-placement-main" className={"cm-placement cm-placement--main "}>
        <div className="cm-details-container">
          <Include self={self} view={"asDetail"} />
        </div>
      </div>
    </div>
  );
};

export default CMTeasableAsFullPreview;
