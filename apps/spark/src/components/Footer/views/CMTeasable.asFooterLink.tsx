import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { Teasable } from "../../../queries/fragments/__generated__/Teasable";
import Link from "../../Link/Link";
import { metaDataElement } from "../../../utils/Preview/MetaData";

const CMTeasableAsFooterLink: React.FC<IncludeProps<Teasable>> = ({ self }) => {
  return (
    <Link to={self} className={"cm-footer__link"} {...metaDataElement(self.id)}>
      {self.teaserTitle}
    </Link>
  );
};

export default CMTeasableAsFooterLink;
