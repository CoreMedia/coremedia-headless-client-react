import React from "react";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import Date from "../Date/Date";
import Image from "../Media/Image";
import { Banner } from "../../models/Banner/Banner";

interface Props {
  banner: Banner;
}

const SearchBanner: React.FC<Props> = ({ banner }) => {
  return (
    <div className={"cm-search-result__item"} {...metaDataElement(banner.metadata?.root)}>
      {banner.picture && (
        <Link to={banner.linkTarget} className={"cm-search-result__image"}>
          <Image picture={banner.picture} cropName="landscape_ratio4x3" width={200} />
        </Link>
      )}
      <div className={"cm-search-result__caption"}>
        <h3 className={"cm-search-result__title"} {...metaDataProperty(banner.metadata?.properties?.title)}>
          <Link to={banner.linkTarget}>{banner?.title}</Link>
        </h3>
        {banner?.plaintext && (
          <p className={"cm-search-result__text"} {...metaDataProperty(banner.metadata?.properties?.text)}>
            <span className={"cm-search-result__date"}>
              <Date date={banner.displayDate} />
            </span>
            <span dangerouslySetInnerHTML={{ __html: banner?.plaintext }} />
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchBanner;
