import React from "react";
import styled from "styled-components";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Date, { Time } from "../Date/Date";
import Image from "../Media/Image";
import { Banner } from "../../models/Banner/Banner";

interface Props {
  banner: Banner;
}

const SearchResult = styled.div`
  margin-bottom: 20px;
  display: flex;

  &:hover {
    background-color: var(--color-background-light-grey);
  }
`;

const SearchResultImage = styled(Link)`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 200px;
    flex-shrink: 0;
    margin-right: 20px;
  }
`;

const SearchResultCaption = styled.div`
  flex-grow: 1;

  a,
  b {
    color: #000;
  }

  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: var(--font-size-heading-2);

    a {
      text-decoration: none;
    }
  }
  p {
    font-size: var(--font-size-text);
    margin-top: 0;
  }
  ${Time} {
    font-style: italic;
  }
`;

const SearchBanner: React.FC<Props> = ({ banner }) => {
  return (
    <SearchResult {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <SearchResultImage to={banner.linkTarget}>
          <Image picture={banner.picture} cropName="landscape_ratio4x3" width={200} />
        </SearchResultImage>
      )}
      <SearchResultCaption>
        <h3 {...metaDataProperty(banner.metadata?.properties?.title)}>
          <Link to={banner.linkTarget}>{banner?.title}</Link>
        </h3>
        {banner?.plaintext && (
          <p {...metaDataProperty(banner.metadata?.properties?.text)}>
            <span>
              <Date date={banner.displayDate} />
            </span>
            <span dangerouslySetInnerHTML={{ __html: banner?.plaintext }} />
          </p>
        )}
      </SearchResultCaption>
    </SearchResult>
  );
};

export default SearchBanner;
