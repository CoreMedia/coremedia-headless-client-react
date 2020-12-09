import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { PreviewPicture, PreviewPicture_crops } from "../../../queries/fragments/__generated__/PreviewPicture";
import { metaDataElement } from "../../../utils/Preview/MetaData";
import FragmentPreviewItem from "../FragmentPreviewItem";
import Image from "../../Media/Image";

const findBestSuitablePreviewSize = (crop: PreviewPicture_crops): number | undefined => {
  const max = crop.sizes.reduce(function (prev, current) {
    return prev && current && prev?.width > current?.width ? prev : current;
  });
  return max ? max.width : crop.minWidth;
};

const CMPictureAsPreview: React.FC<IncludeProps<PreviewPicture>> = ({ self }) => {
  return (
    <div className={"cm-preview"} {...metaDataElement(self.id)}>
      {self.crops.map((crop, index) => {
        return (
          <FragmentPreviewItem key={index} title={crop.name}>
            <Image picture={self} cropName={crop.name} width={findBestSuitablePreviewSize(crop)} />
          </FragmentPreviewItem>
        );
      })}
    </div>
  );
};

export default CMPictureAsPreview;
