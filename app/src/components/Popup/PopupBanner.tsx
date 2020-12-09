import React from "react";
import { OverlayConfiguration } from "../ImageMap/ImageMapHelpers";
import { metaDataElement, metaDataProperty } from "../../utils/Preview/MetaData";
import Link from "../Link/Link";
import CTA from "../CTA/CTA";
import { Banner } from "../../models/Banner/Banner";
import Image from "../Media/Image";

import "./PopupBanner.scss";

interface Props {
  banner: Banner;
  overlay: OverlayConfiguration;
}

const PopupBanner: React.FC<Props> = ({ banner, overlay, children }) => {
  return (
    <div className={`cm-popup`} {...metaDataElement(banner.metadata?.root)}>
      {overlay.displayPicture && banner.picture && (
        <div className="cm-popup__container">
          <Link to={banner.linkTarget} className={"cm-popup__picture-link"}>
            <Image picture={banner.picture} cropName={"portrait_ratio2x3"} width={400} />
          </Link>
        </div>
      )}
      <div className="cm-popup__container">
        <div className="cm-popup__content">
          {banner?.title && overlay.displayTitle && (
            <div className="cm-popup__header">
              <h5 className="cm-popup__title" {...metaDataProperty(banner.metadata?.title)}>
                {banner?.title}
              </h5>
            </div>
          )}
          {children}
          {banner?.plaintext && overlay.displayShortText && (
            <div
              className="cm-popup__text"
              dangerouslySetInnerHTML={{ __html: banner?.plaintext }}
              {...metaDataProperty(banner.metadata?.plaintext)}
            />
          )}
          <CTA targets={banner.targets} />
        </div>
      </div>
    </div>
  );
};

export default PopupBanner;
