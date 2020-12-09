import React, { FC } from "react";
import { match } from "react-router";
import ProductBySeoSegmentQuery from "../queries/ProductBySeoSegmentQuery";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, ProductNotFoundAlert } from "../components/Error/Alert";
import DetailedProduct from "../components/Product/DetailedProduct";
import { DetailProduct } from "../models/Detail/DetailProduct";
import { initializeGrid } from "../models/Grid/Grid";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const ProductPage: FC<PageProps> = ({ match }) => {
  const { data, loading, error } = ProductBySeoSegmentQuery(match.params.seoSegment);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.commerce || (!data.commerce.productBySeoSegment && !data.commerce.product)) {
    return <ProductNotFoundAlert />;
  }

  const product = data.commerce.productBySeoSegment || data.commerce.product;
  if (!product) {
    return <ProductNotFoundAlert />;
  }

  const detailProduct: DetailProduct = {
    ...product,
    grid: initializeGrid(product.grid),
  };

  return <DetailedProduct {...detailProduct} />;
};

export default ProductPage;
