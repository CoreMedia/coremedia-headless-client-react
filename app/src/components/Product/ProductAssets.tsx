import React from "react";
import { Picture } from "../../models/Banner/Picture";
import { CatalogPicture as CommercePicture } from "../../models/Banner/CatalogPicture";
import CatalogPicture from "../Media/CatalogPicture";
import Image from "../Media/Image";

interface Props {
  pictures: Array<Picture | null> | null;
  catalogPicture: CommercePicture | null;
}

const ProductAssets: React.FC<Props> = ({ pictures, catalogPicture }) => {
  return (
    <div className={`cm-product-assets__tiles cm-details__medias`}>
      {pictures &&
        pictures.map((picture, index) => {
          return (
            picture && (
              <div className={"cm-product-asset cm-product-asset--portrait"} key={index}>
                <Image picture={picture} cropName={"portrait_ratio2x3"} width={768} />
              </div>
            )
          );
        })}
      {(!pictures || pictures.length === 0) && catalogPicture && (
        <div className={"cm-product-asset cm-product-asset--portrait"}>
          <CatalogPicture picture={catalogPicture} />
        </div>
      )}
    </div>
  );
};
export default ProductAssets;
