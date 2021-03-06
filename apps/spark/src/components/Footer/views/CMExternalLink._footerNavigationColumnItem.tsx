import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Link from "../../Link/Link";
import { metaDataElement } from "../../../utils/Preview/MetaData";
import { ExternalLink } from "../../../queries/fragments/__generated__/ExternalLink";

const FooterNavigationColumnItem: React.FC<IncludeProps<ExternalLink>> = ({ self }) => {
  return (
    <li className={"cm-footer-navigation-column__item"}>
      <Link
        to={self.url}
        className={"cm-footer-navigation-column__link"}
        {...metaDataElement(self.id)}
        openInNewTab={self.openInNewTab || false}
        externalLink={true}
      >
        {self.teaserTitle}
      </Link>
    </li>
  );
};

export default FooterNavigationColumnItem;
