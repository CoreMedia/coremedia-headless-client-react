import React from "react";
import Link from "../Link/Link";
import PreviewMetadata, { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Date from "../Date/Date";
import { Author } from "../../models/Banner/Author";

interface Props extends PreviewMetadata {
  displayDate?: string;
  authors?: Array<Author | null> | null;
  teaserBlockClass?: string; //todo use atomic design with a proper css class here instead of passing css classes
}

const Editorial: React.FC<Props> = ({ displayDate, authors, teaserBlockClass = "", metadata = {} }) => {
  return (
    <>
      {(displayDate || (authors && authors.length > 0)) && (
        <p className={`${teaserBlockClass}__editorial`}>
          {displayDate && (
            <span className={`${teaserBlockClass}__time`} {...metaDataProperty(metadata.properties?.displayDate)}>
              <Date date={displayDate} />
            </span>
          )}
          {authors &&
            authors.map((author, index) => {
              return (
                author &&
                author.displayName && (
                  <span key={index} {...metaDataElement(author.metadata?.root)}>
                    <Link
                      to={author.linkTarget}
                      key={index}
                      className={`${teaserBlockClass}__author`}
                      {...metaDataProperty(author.metadata?.properties?.displayName)}
                    >
                      {author.displayName}
                    </Link>
                  </span>
                )
              );
            })}
        </p>
      )}
    </>
  );
};

export default Editorial;
