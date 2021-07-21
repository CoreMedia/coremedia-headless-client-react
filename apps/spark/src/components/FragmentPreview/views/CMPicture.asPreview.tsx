import React from "react";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import {
  PreviewPicture as GrpahQLPreviewPicture,
  PreviewPicture_crops,
} from "../../../queries/fragments/__generated__/PreviewPicture";
import { metaDataElement } from "../../../utils/Preview/MetaData";
import FragmentPreviewItem from "../FragmentPreviewItem";
import Image from "../../Media/Image";
import { initializePicture, Picture } from "../../../models/Banner/Picture";
import { FragmentPreviewContextProvider } from "../../../context/FragmentPreviewContext";

const findBestSuitablePreviewSize = (crop: PreviewPicture_crops): number | undefined => {
  const max = crop.sizes.reduce(function (prev, current) {
    return prev && current && prev?.width > current?.width ? prev : current;
  });
  return max ? max.width : crop.minWidth;
};

const CMPictureAsPreview: React.FC<IncludeProps<GrpahQLPreviewPicture>> = ({ self }) => {
  const picture: Picture = initializePicture(self);
  return (
    <div className={"cm-preview"} {...metaDataElement(picture.metadata?.root)}>
      <FragmentPreviewContextProvider type={self.__typename}>
        {self.crops.map((crop, index) => {
          return (
            <FragmentPreviewItem key={index} title={crop.name}>
              <Image picture={picture} cropName={crop.name} width={findBestSuitablePreviewSize(crop)} />
            </FragmentPreviewItem>
          );
        })}
      </FragmentPreviewContextProvider>
    </div>
  );
};

export default CMPictureAsPreview;
