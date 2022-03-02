import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "@coremedia-labs/graphql-layer";
import Link from "../../Link/Link";

const CMTeasableAsFooterNavigationColumn: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  return (
    <div className={"cm-footer-navigation__column"}>
      {self.teaserTitle && (
        <h2 className={"cm-footer-navigation-column__title"}>
          <Link to={self} className={"cm-footer-navigation-column__link"}>
            {self.teaserTitle}
          </Link>
        </h2>
      )}
    </div>
  );
};

export default CMTeasableAsFooterNavigationColumn;
