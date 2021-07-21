import React from "react";
import Link from "../Link/Link";
import PreviewMetadata, { metaDataProperty } from "../../utils/Preview/MetaData";
import "./BannerCaption.scss";

interface Props extends PreviewMetadata {
  linkTarget?: string;
  title: string | null;
  plaintext: string | null;
  openInNewTab: boolean;
  externalLink: boolean;
}

const BannerCaption: React.FC<Props> = ({
  title,
  plaintext,
  linkTarget,
  openInNewTab,
  externalLink,
  metadata = {},
}) => {
  return (
    <>
      {title && (
        <Link
          className={`cm-banner__title`}
          to={linkTarget || ""}
          openInNewTab={openInNewTab}
          externalLink={externalLink}
        >
          <h3 className={`cm-banner__headline`} {...metaDataProperty(metadata.properties?.title)}>
            {title}
          </h3>
        </Link>
      )}
      {plaintext && (
        <div
          className={`cm-banner__text`}
          dangerouslySetInnerHTML={{ __html: plaintext }}
          {...metaDataProperty(metadata.properties?.plaintext)}
        />
      )}
    </>
  );
};

export default BannerCaption;
