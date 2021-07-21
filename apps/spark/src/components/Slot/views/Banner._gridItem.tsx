import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import Include from "../../../utils/ViewDispatcher/Include";
import { Dispatchable } from "../../../utils/ViewDispatcher/Dispatchable";
import { metaDataElement, PreviewMetadataProps } from "../../../utils/Preview/MetaData";
import { Slot } from "../../../models/Grid/Slot";

const BannerGridItem: React.FC<IncludeProps<Dispatchable>> = ({ self, params }) => {
  const metadata: PreviewMetadataProps<Slot> = params?.metadata as PreviewMetadataProps<Slot>;
  return (
    <div className={`cm-slot__item`} {...metaDataElement(metadata?.root, metadata?.properties?.items)}>
      {params && <Include self={self} view={(params.includeView as string) || ""} />}
    </div>
  );
};

export default BannerGridItem;
