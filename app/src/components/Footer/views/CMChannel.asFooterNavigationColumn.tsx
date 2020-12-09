import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import Link from "../../Link/Link";
import { Navigation } from "../../../queries/fragments/Navigation";

const CMChannelAsFooterNavigationColumn: React.FC<IncludeProps<Navigation>> = ({ self }) => {
  return (
    <div className={"cm-footer-navigation__column"}>
      {self.teaserTitle && (
        <h2 className={"cm-footer-navigation-column__title"}>
          <Link to={self} className={"cm-footer-navigation-column__link"}>
            {self.teaserTitle}
          </Link>
        </h2>
      )}

      <ul className={"cm-footer-navigation-column"}>
        {self.children &&
          self.children.map((item, index) => {
            return item && <Include self={item} key={index} view={"_footerNavigationColumnItem"} />;
          })}
      </ul>
    </div>
  );
};

export default CMChannelAsFooterNavigationColumn;
