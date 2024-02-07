import React from "react";
import { CmPicture, CmPicturePreviewFragment, Crop } from "@coremedia-labs/graphql-layer";
import { useTranslation } from "react-i18next";
import IncludeProps from "../../../utils/ViewDispatcher/IncludeProps";
import { metaDataElement, metaDataForResponsiveDevices } from "../../../utils/Preview/MetaData";
import FragmentPreviewItem from "../FragmentPreviewItem";
import Image from "../../Media/Image";
import { initializePicture, Picture } from "../../../models/Banner/Picture";
import { FragmentPreviewContextProvider } from "../../../context/FragmentPreviewContext";

const findBestSuitablePreviewSize = (crop: Crop): number | undefined => {
  const max = crop.sizes.reduce(function (prev, current) {
    return prev && current && prev?.width > current?.width ? prev : current;
  });
  return max ? max.width : crop.minWidth;
};

const CMPictureAsPreview: React.FC<IncludeProps<CmPicturePreviewFragment>> = ({ self }) => {
  const picture: Picture = initializePicture(self as CmPicture);
  const { t } = useTranslation();
  return (
    <div {...metaDataElement(picture.metadata?.root)} {...metaDataForResponsiveDevices()}>
      <FragmentPreviewContextProvider type={self?.__typename}>
        {self?.crops.map((crop, index) => {
          return (
            <FragmentPreviewItem key={index} title={t(crop.name)}>
              <Image picture={picture} cropName={crop.name} width={findBestSuitablePreviewSize(crop)} />
            </FragmentPreviewItem>
          );
        })}
      </FragmentPreviewContextProvider>
    </div>
  );
};

export default CMPictureAsPreview;
