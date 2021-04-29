import React from "react";
import { Picture } from "../../models/Banner/Picture";
import Image from "../Media/Image";

interface Props {
  pictures: Array<Picture | null> | null;
}

const ProductAssets: React.FC<Props> = ({ pictures }) => {
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
      {(!pictures || pictures.length === 0) && (
        <div className={"cm-product-asset cm-product-asset--portrait"}>{/* todo: add fallback image*/}</div>
      )}
    </div>
  );
};
export default ProductAssets;
