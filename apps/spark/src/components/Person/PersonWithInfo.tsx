import React from "react";
import PreviewMetadata, { metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Image from "../Media/Image";
import { Picture } from "../../models/Banner/Picture";

interface Props extends PreviewMetadata {
  displayName: string | null;
  picture: Picture | null;
  cssClass?: string;
  jobTitle: string | null;
  organization: string | null;
  eMail: string | null;
}

const PersonWithInfo: React.FC<Props> = ({
  picture,
  displayName,
  jobTitle,
  organization,
  eMail,
  cssClass = "cm-person",
  metadata = {},
}) => {
  return (
    <div className={`${cssClass}__introduction`}>
      {picture && (
        <div className={`${cssClass}__picture-person`}>
          <Image picture={picture} cropName={"portrait_ratio1x1"} width={200} />
        </div>
      )}
      <div className={`${cssClass}__description`}>
        {displayName && (
          <h1 className={`${cssClass}__name`} {...metaDataProperty(metadata.properties?.displayName)}>
            {displayName}
          </h1>
        )}
        {jobTitle && (
          <h2 className={`${cssClass}__job`} {...metaDataProperty(metadata.properties?.jobTitle)}>
            {jobTitle}
          </h2>
        )}
        {organization && (
          <p className={`${cssClass}__organization`} {...metaDataProperty(metadata.properties?.organization)}>
            {organization}
          </p>
        )}
        {eMail && (
          <p className={`${cssClass}__email`} {...metaDataProperty(metadata.properties?.eMail)}>
            <Link to={`mailto:${eMail}`}>
              <span className={`${cssClass}__email-icon`} />
              <span className={`${cssClass}__email-text`}>{eMail}</span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
export default PersonWithInfo;
