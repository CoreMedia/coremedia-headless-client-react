import React, { createContext } from "react";
import { Picture } from "../models/Banner/Picture";
import { DetailProduct } from "../models/Detail/DetailProduct";

export interface ProductPageContextData {
  media: Array<Picture>;
  product: DetailProduct | null;
}

const ProductPageContext = createContext<ProductPageContextData>({
  media: [],
  product: null,
});

const ProductPageContextProvider: React.FC<ProductPageContextData> = ({ media, product, children }) => {
  const contextValues: ProductPageContextData = {
    media: media,
    product: product,
  };

  return <ProductPageContext.Provider value={contextValues}>{children}</ProductPageContext.Provider>;
};

export const useProductPageContextState = (): ProductPageContextData => {
  const context = React.useContext(ProductPageContext);
  if (context === undefined) {
    throw new Error("useProductPageContextState must be used within a ProductPageContextProvider");
  }
  return context;
};

export default ProductPageContextProvider;
