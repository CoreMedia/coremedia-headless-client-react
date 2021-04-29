import React from "react";
import PreviewMetadataProps, { metaDataProperty } from "../../utils/Preview/MetaData";
import { Slot } from "../../models/Grid/Slot";
import LandscapeBannerContainer from "../LandscapeBanner/LandscapeBannerContainer";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

interface Props extends PreviewMetadataProps {
  related: Array<Dispatchable | null>;
}

const DetailedRelated: React.FC<Props> = ({ related, metadata = {} }) => {
  const slot: Slot = {
    title: "Related",
    items: related,
  };
  return (
    <>
      {related && related.length > 0 && (
        <section className={`cm-related cm-details__related`} {...metaDataProperty(metadata.related)}>
          <LandscapeBannerContainer slot={slot} />
        </section>
      )}
    </>
  );
};

export default DetailedRelated;
