import React, { FC } from "react";
import { metaDataElement } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import StaticCode from "../StaticCode/StaticCode";
import { Navigation } from "../../models/Navigation/Navigation";

const FooterItem: FC<Navigation> = ({ title, code, linkTarget, openInNewTab, externalLink, metadata }) => {
  if (code) {
    return <StaticCode code={code} metadata={metadata} />;
  }
  return (
    <li {...metaDataElement(metadata?.root)}>
      <Link to={linkTarget} openInNewTab={openInNewTab} externalLink={externalLink}>
        {title}
      </Link>
    </li>
  );
};

export default FooterItem;
