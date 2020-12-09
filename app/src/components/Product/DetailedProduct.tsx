import React from "react";
import Col from "../PageGrid/Col";
import { colByName } from "../../utils/PageGrid/PageGridUtil";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import ProductDetails from "./ProductDetails";
import ProductAssets from "./ProductAssets";

import "./Product.scss";

const DetailedProduct: React.FC<DetailProduct> = ({
  name,
  shortDescription,
  longDescription,
  pictures,
  catalogPicture,
  grid,
}) => {
  return (
    <>
      <Col col={colByName(grid, "banner")} />
      <div className="cm-placement cm-placement--main">
        <div className={`cm-details-container`}>
          <div className={`cm-details cm-pdp`}>
            {<ProductAssets pictures={pictures} catalogPicture={catalogPicture} />}
            {<ProductDetails name={name} shortDescription={shortDescription} longDescription={longDescription} />}
          </div>
        </div>
      </div>
      <Col col={colByName(grid, "tab")} />
      <Col col={colByName(grid, "additional")} />
    </>
  );
};
export default DetailedProduct;
