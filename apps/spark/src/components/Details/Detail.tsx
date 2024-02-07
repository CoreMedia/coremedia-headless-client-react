import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Detail as DetailModel } from "../../models/Detail/Detail";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Date from "../Date/Date";
import LandscapeBannerContainer from "../LandscapeBanner/LandscapeBannerContainer";
import Link from "../Link/Link";
import PersonBlurb from "../Person/PersonBlurb";
import RichText from "../RichText/RichText";
import { ImageBox } from "../Media/ResponsiveImage";
import TagList from "../Tags/Taglist";
import DetailedMedia from "./DetailedMedia";

export const StyledDetail = styled.div`
  @media screen and (min-width: 1200px) {
    width: var(--screen-size-max);
    max-width: 100%;
  }
`;

export const Article = styled.article`
  margin-bottom: var(--padding-large);

  ${ImageBox} {
    --aspect-ratio: 8 * 3;
  }
`;

export const Headline = styled.h1`
  font-family: var(--font-family-headline);
  font-size: var(--font-size-heading-1);
  text-align: center;
  margin-bottom: var(--padding-small);
`;

export const MetaList = styled.div`
  text-align: center;
  margin-bottom: var(--padding-large);

  > span + span:before {
    content: "•";
    margin: 0 var(--padding-small);
    display: inline-block;
  }
`;

export const Text = styled.div`
  padding: 0;
  margin-top: var(--padding-large);
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 768px) {
    padding: 0 15%;
  }

  ${ImageBox} {
    --aspect-ratio: 4 * 3;
  }
`;

export const Additional = styled.section`
  margin-top: var(--padding-large);
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 768px) {
    padding: 0 10%;
  }
`;

const Detail: React.FC<DetailModel> = ({
  title,
  authors,
  displayDate,
  readTime,
  media,
  tags,
  related,
  structuredText,
  structuredTextLinks,
  metadata = {},
}) => {
  const { t } = useTranslation();

  return (
    <StyledDetail {...metaDataElement(metadata.root)}>
      <Article>
        <Headline {...metaDataProperty(metadata.properties?.title)}>{title}</Headline>
        <MetaList>
          {authors &&
            authors.map((author, index) => {
              return (
                author &&
                author.displayName && (
                  <span key={index} {...metaDataElement(author.metadata?.root)}>
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
            <span>
              <Date date={displayDate} />
            </span>
          )}
          {readTime && <span>{readTime} min read</span>}
        </MetaList>
        {media && <DetailedMedia media={media} />}
        {structuredText && (
          <Text {...metaDataProperty(metadata.properties?.structuredText)}>
            <RichText text={structuredText} embeddedItems={structuredTextLinks} />
          </Text>
        )}
      </Article>
      {authors && authors.length > 0 && (
        <Additional {...metaDataProperty(metadata.properties?.authors)}>
          {authors.map((author, index) => {
            return author && <PersonBlurb {...author} key={index} />;
          })}
        </Additional>
      )}
      {tags && (
        <Additional {...metaDataProperty(metadata.properties?.tags)}>
          <TagList tags={tags} />
        </Additional>
      )}
      {related && related.length > 0 && (
        <section {...metaDataProperty(metadata.properties?.related)}>
          <LandscapeBannerContainer title={t("DetailPage.related")} items={related} />
        </section>
      )}
    </StyledDetail>
  );
};

export default Detail;
