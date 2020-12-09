import React from "react";
import Link from "../Link/Link";
import PreviewMetadataProps, { metaDataProperty } from "../../utils/Preview/MetaData";
import "./BannerCaption.scss";

interface Props extends PreviewMetadataProps {
  linkTarget?: string;
  title: string | null;
  plaintext: string | null;
}

const BannerCaption: React.FC<Props> = ({ title, plaintext, linkTarget, metadata = {} }) => {
  return (
    <>
      {title && (
        <Link className={`cm-banner__title`} to={linkTarget || ""}>
          <h3 className={`cm-banner__headline`} {...metaDataProperty(metadata.title)}>
            {title}
          </h3>
        </Link>
      )}
      {plaintext && (
        <div
          className={`cm-banner__text`}
          dangerouslySetInnerHTML={{ __html: plaintext }}
          {...metaDataProperty(metadata.plaintext)}
        />
      )}
    </>
  );
};

export default BannerCaption;
