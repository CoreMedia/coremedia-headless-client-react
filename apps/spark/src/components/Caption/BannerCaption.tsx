import React from "react";
import Link, { LinkAttributes } from "../Link/Link";
import PreviewMetadata, { metaDataProperty } from "../../utils/Preview/MetaData";
import "./BannerCaption.scss";

interface Props extends PreviewMetadata, LinkAttributes {
  title: string | null;
  plaintext: string | null;
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
