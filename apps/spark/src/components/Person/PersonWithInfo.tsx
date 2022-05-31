import React from "react";
import styled from "styled-components";
import { metaDataProperty, PreviewMetadata } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Image, { StyledImage } from "../Media/Image";
import { Picture } from "../../models/Banner/Picture";
import Envelop from "./assets/envelope.svg";

interface Props extends PreviewMetadata {
  displayName: string | null;
  picture: Picture | null;
  jobTitle: string | null;
  organization: string | null;
  eMail: string | null;
}

const Introduction = styled.div`
  display: flex;
  padding: 0;
  margin: 30px auto;

  @media screen and (min-width: 768px) {
    padding: 0 10%;
  }
`;

const PersonPicture = styled.div`
  min-width: 100px;
  width: 25%;
  max-width: 200px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 15px;

  ${StyledImage} {
    border-radius: 50%;
    background-color: var(--color-background-image);
  }

  @media screen and (min-width: 768px) {
    margin-right: 30px;
  }
`;

const Name = styled.h1`
  margin-top: 0;
  margin-bottom: 6px;
  font-size: var(--font-size-heading-1);
`;

const EmailIcon = styled.span`
  display: inline-block;
  background-repeat: no-repeat;
  background-position: 50%;
  background-image: url(${Envelop});
  height: 18px;
  width: 18px;
  margin-right: 6px;
  vertical-align: bottom;
`;

const PersonWithInfo: React.FC<Props> = ({ picture, displayName, jobTitle, organization, eMail, metadata = {} }) => {
  return (
    <Introduction>
      {picture && (
        <PersonPicture>
          <Image picture={picture} cropName={"portrait_ratio1x1"} width={200} />
        </PersonPicture>
      )}
      <div>
        {displayName && <Name {...metaDataProperty(metadata.properties?.displayName)}>{displayName}</Name>}
        {jobTitle && <h2 {...metaDataProperty(metadata.properties?.jobTitle)}>{jobTitle}</h2>}
        {organization && <p {...metaDataProperty(metadata.properties?.organization)}>{organization}</p>}
        {eMail && (
          <p {...metaDataProperty(metadata.properties?.eMail)}>
            <Link to={`mailto:${eMail}`}>
              <EmailIcon />
              <span>{eMail}</span>
            </Link>
          </p>
        )}
      </div>
    </Introduction>
  );
};
export default PersonWithInfo;
