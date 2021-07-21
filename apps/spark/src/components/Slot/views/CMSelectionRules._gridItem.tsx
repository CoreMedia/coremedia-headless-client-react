import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { SelectionRules } from "../../../queries/fragments/__generated__/SelectionRules";
import PreviewMetadata, { initializeMetadata } from "../../../utils/Preview/MetaData";

const CMSelectionRulesAsHeroBanner: React.FC<IncludeProps<SelectionRules>> = ({ self, params }) => {
  const metadata: PreviewMetadata = initializeMetadata(self.id);
  if (metadata.metadata) {
    metadata.metadata.properties = { ...metadata.metadata?.properties, items: "items" };
    params = { ...params, metadata: metadata.metadata };
  }
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
