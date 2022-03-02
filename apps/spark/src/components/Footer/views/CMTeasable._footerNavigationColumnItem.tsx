import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Link from "../../Link/Link";
import { metaDataElement } from "../../../utils/Preview/MetaData";
import { Teasable } from "@coremedia-labs/graphql-layer";

const FooterNavigationColumnItem: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  return (
    <li className={"cm-footer-navigation-column__item"}>
      <Link to={self} className={"cm-footer-navigation-column__link"} {...metaDataElement({ id: self.id })}>
        {self.teaserTitle}
      </Link>
    </li>
  );
};

export default FooterNavigationColumnItem;
