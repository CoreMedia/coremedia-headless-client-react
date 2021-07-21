import React from "react";
import PreviewMetadata, { metaDataProperty } from "../../utils/Preview/MetaData";
import { Slot } from "../../models/Grid/Slot";
import LandscapeBannerContainer from "../LandscapeBanner/LandscapeBannerContainer";
import { Dispatchable } from "../../utils/ViewDispatcher/Dispatchable";

interface Props extends PreviewMetadata {
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
        <section className={`cm-related cm-details__related`} {...metaDataProperty(metadata.properties?.related)}>
          <LandscapeBannerContainer slot={slot} />
        </section>
      )}
    </>
  );
};

export default DetailedRelated;
