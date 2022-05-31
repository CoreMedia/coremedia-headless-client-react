import React from "react";
import styled from "styled-components";
import Link from "../Link/Link";
import { metaDataElement, metaDataProperty, PreviewMetadata } from "../../utils/Preview/MetaData";
import Date from "../Date/Date";
import { Author } from "../../models/Banner/Author";

interface Props extends PreviewMetadata {
  displayDate?: string;
  authors?: Array<Author | null> | null;
}

export const StyledEditorial = styled.p``;
export const StyledAuthor = styled(Link)``;

const Editorial: React.FC<Props> = ({ displayDate, authors, metadata = {} }) => {
  return (
    <>
      {(displayDate || (authors && authors.length > 0)) && (
        <StyledEditorial>
          {displayDate && (
            <span {...metaDataProperty(metadata.properties?.displayDate)}>
              <Date date={displayDate} />
            </span>
          )}
          {authors &&
            authors.map((author, index) => {
              return (
                author &&
                author.displayName && (
                  <span key={index} {...metaDataElement(author.metadata?.root)}>
                    <StyledAuthor
                      to={author.linkTarget}
                      key={index}
                      {...metaDataProperty(author.metadata?.properties?.displayName)}
                    >
                      {author.displayName}
                    </StyledAuthor>
                  </span>
                )
              );
            })}
        </StyledEditorial>
      )}
    </>
  );
};

export default Editorial;
