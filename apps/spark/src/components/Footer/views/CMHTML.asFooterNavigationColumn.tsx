import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { CMHTMLFragment } from "../../../queries/fragments/__generated__/CMHTMLFragment";

const CMHTMLAsFooterNavigationColumn: React.FC<IncludeProps<CMHTMLFragment>> = ({ self }) => {
  return (
    <div className="cm-footer-navigation__column">
      {self.teaserTitle && <h2 className="cm-footer-navigation-column__title">{self.teaserTitle}</h2>}
      <div className="cm-footer-navigation-column">
        <div dangerouslySetInnerHTML={{ __html: self.html || "" }} />
      </div>
    </div>
  );
};

export default CMHTMLAsFooterNavigationColumn;
