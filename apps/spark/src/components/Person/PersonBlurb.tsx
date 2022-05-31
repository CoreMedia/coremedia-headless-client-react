import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Image, { StyledImage } from "../Media/Image";
import { Author } from "../../models/Banner/Author";

const Person = styled.div`
  display: flex;
  margin-bottom: var(--padding-medium);
  padding: var(--padding-medium);
  border-radius: var(--padding-small);
  background-color: var(--color-background-light-grey);
`;

const PersonPicture = styled(Link)`
  display: block;
  margin-right: var(--padding-medium);

  ${StyledImage} {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
`;

const PersonDescription = styled.div`
  > a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    > h3 {
      font-size: var(--font-size-heading-3);
      margin: var(--padding-small) 0;
    }
  }
`;

const PersonBlurb: React.FC<Author> = ({ displayName, text, picture, linkTarget, metadata = {} }) => {
  return (
    <Person {...metaDataElement(metadata.root)}>
      {picture && (
        <PersonPicture to={linkTarget}>
          <Image picture={picture} cropName={"portrait_ratio1x1"} width={200} />
        </PersonPicture>
      )}
      <PersonDescription>
        {displayName && (
          <Link to={linkTarget}>
            <h3 {...metaDataProperty(metadata?.properties?.displayName)}>{displayName}</h3>
          </Link>
        )}
        {text && <div {...metaDataProperty(metadata?.properties?.text)} dangerouslySetInnerHTML={{ __html: text }} />}
      </PersonDescription>
    </Person>
  );
};
export default PersonBlurb;
