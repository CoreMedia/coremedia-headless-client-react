import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { SelectionRules } from "@coremedia-labs/graphql-layer";
import Include from "../../../utils/ViewDispatcher/Include";

const CMSelectionRulesTeaser: React.FC<IncludeProps<SelectionRules>> = ({ self }) => {
  return (
    <>
      {self.defaultContent &&
        self.defaultContent.map((item, index) => {
          return item && <Include self={item} key={index} view={"asItem"} />;
        })}
    </>
  );
};

export default CMSelectionRulesTeaser;
