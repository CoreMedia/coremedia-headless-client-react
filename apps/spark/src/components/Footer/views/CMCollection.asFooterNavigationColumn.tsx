import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { Collection } from "@coremedia-labs/graphql-layer";

const CMCollectionAsFooterNavigationColumn: React.FC<IncludeProps<Collection>> = ({ self }) => {
  return (
    <div className="cm-footer-navigation__column">
      {self.teaserTitle && <h2 className="cm-footer-navigation-column__title">{self.teaserTitle}</h2>}

      <ul className="cm-footer-navigation-column">
        {self.items &&
          self.items.map((item, index) => {
            return item && <Include self={item} key={index} view={"_footerNavigationColumnItem"} />;
          })}
      </ul>
    </div>
  );
};

export default CMCollectionAsFooterNavigationColumn;
