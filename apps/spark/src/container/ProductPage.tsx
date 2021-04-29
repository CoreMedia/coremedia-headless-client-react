import React, { FC } from "react";
import { match } from "react-router";
import ProductBySeoSegmentQuery from "../queries/ProductBySeoSegmentQuery";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, ProductNotFoundAlert } from "../components/Error/Alert";
import DetailedProduct from "../components/Product/DetailedProduct";
import { DetailProduct } from "../models/Detail/DetailProduct";
import { initializeGrid } from "../models/Grid/Grid";
import { useSiteContextState } from "../context/SiteContextProvider";
import ProductByIdQuery from "../queries/ProductByIdQuery";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const ProductPage: FC<PageProps> = ({ match }) => {
  let product = null;
  const { useSeo, siteId } = useSiteContextState();
  if (useSeo) {
    const { data, loading, error } = ProductBySeoSegmentQuery(match.params.seoSegment, siteId);
    if (loading) return <Loading />;
    if (error) return <ApolloClientAlert error={error} />;
    if (!data || !data.productBySeoSegment) {
      return <ProductNotFoundAlert />;
    }
    product = data.productBySeoSegment;
  } else {
    const { data, loading, error } = ProductByIdQuery(match.params.seoSegment, siteId);
    if (loading) return <Loading />;
    if (error) return <ApolloClientAlert error={error} />;
    if (!data || !data.product) {
      return <ProductNotFoundAlert />;
    }
    product = data.product;
  }

  if (!product) {
    return <ProductNotFoundAlert />;
  }

  const detailProduct: DetailProduct = {
    ...product,
    pictures: product.augmentation && product.augmentation?.pictures,
    grid: product.augmentation && initializeGrid(product.augmentation.grid),
  };

  return <DetailedProduct {...detailProduct} />;
};

export default ProductPage;
