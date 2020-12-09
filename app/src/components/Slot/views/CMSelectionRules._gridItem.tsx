import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { SelectionRules } from "../../../queries/fragments/__generated__/SelectionRules";

const CMSelectionRulesAsHeroBanner: React.FC<IncludeProps<SelectionRules>> = ({ self, params }) => {
  return (
    <>
      {self.defaultContent &&
        self.defaultContent.map((item, index) => {
          return item && <Include self={item} key={index} view={"_gridItem"} params={{ ...params }} />;
        })}
    </>
  );
};

export default CMSelectionRulesAsHeroBanner;
