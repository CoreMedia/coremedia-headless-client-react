import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Date from "../Date/Date";
import DetailedMedia from "./DetailedMedia";
import Related from "./DetailedRelated";
import TagList from "../Tags/Taglist";
import PersonBlurb from "../Person/PersonBlurb";
import RichText from "../RichText/RichText";
import Link from "../Link/Link";
import { Detail } from "../../models/Detail/Detail";

import "./Details.scss";

const DetailedTeasable: React.FC<Detail> = ({
  title,
  authors,
  displayDate,
  readTime,
  media,
  tags,
  related,
  structuredText,
  metadata = {},
}) => {
  return (
    <div className={`cm-details`} {...metaDataElement(metadata.root)}>
      <article className={`cm-details__content`}>
        <h1 className={`cm-details__headline`} {...metaDataProperty(metadata.properties?.title)}>
          {title}
        </h1>
        <div className={"cm-details__metalist"}>
          {authors &&
            authors.map((author, index) => {
              return (
                author &&
                author.displayName && (
                  <span className={`cm-details__metalist-item`} key={index} {...metaDataElement(author.metadata?.root)}>
                    <Link
                      to={author.linkTarget}
                      key={index}
                      {...metaDataProperty(author.metadata?.properties?.displayName)}
                    >
                      {author.displayName}
                    </Link>
                  </span>
                )
              );
            })}
          {displayDate && (
            <span className={`cm-details__metalist-item`}>
              <Date date={displayDate} />
            </span>
          )}
          {readTime && <span className={`cm-details__metalist-item`}>{readTime} min read</span>}
        </div>
        {media && <DetailedMedia media={media} />}
        {structuredText && (
          <div className={`cm-details__text`} {...metaDataProperty(metadata.properties?.structuredText)}>
            <RichText text={structuredText} />
          </div>
        )}
      </article>
      {authors && authors.length > 0 && (
        <section className={`cm-details__authors`} {...metaDataProperty(metadata.properties?.authors)}>
          {authors.map((author, index) => {
            return author && <PersonBlurb {...author} key={index} />;
          })}
        </section>
      )}
      {tags && (
        <section className={`cm-details__tags`} {...metaDataProperty(metadata.properties?.tags)}>
          <TagList tags={tags} />
        </section>
      )}
      {related && (
        <section className={`cm-details__related`} {...metaDataProperty(metadata.properties?.related)}>
          <Related related={related} />
        </section>
      )}
    </div>
  );
};

export default DetailedTeasable;
