import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { ExternalLink } from "@coremedia-labs/graphql-layer";
import Link from "../../Link/Link";
import { metaDataElement } from "../../../utils/Preview/MetaData";

const CMExternalLinkAsFooterLink: React.FC<IncludeProps<ExternalLink>> = ({ self }) => {
  return (
    <Link
      to={self.url}
      className={"cm-footer__link"}
      {...metaDataElement({ id: self.id })}
      openInNewTab={self.openInNewTab || false}
      externalLink={true}
    >
      {self.teaserTitle}
    </Link>
  );
};

export default CMExternalLinkAsFooterLink;
