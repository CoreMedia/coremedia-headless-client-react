import React, { FC } from "react";
import { match } from "react-router-dom";
import { ProductImpl, useProductByIdQuery } from "@coremedia-labs/graphql-layer";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, ProductNotFoundAlert } from "../components/Error/Alert";
import { DetailProduct } from "../models/Detail/DetailProduct";
import { Placements } from "../models/Grid/Grid";
import { initializePicture, Picture } from "../models/Banner/Picture";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import { initializeProductBannerFromProduct } from "../models/Banner/ProductBanner";
import { useSiteContextState } from "../context/SiteContextProvider";
import DetailedProduct from "../components/Product/DetailedProduct";
import ProductPageContext from "../context/ProductPageContext";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const ProductPage: FC<PageProps> = ({ match }) => {
  const { siteId, rootSegment } = useSiteContextState();
  const { data, loading, error } = useProductByIdQuery({
    variables: {
      externalId: match.params.seoSegment,
      siteId: siteId,
    },
  });
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <ApolloClientAlert error={error} />;
  }
  if (!data || !data.product) {
    return <ProductNotFoundAlert />;
  }
  const { product } = data;

  if (!product) {
    return <ProductNotFoundAlert />;
  }

  let media: Array<Picture> = [];
  const imageUrl = product.defaultImageUrl || product.thumbnailUrl;
  if (imageUrl) {
    media = [{ uriTemplate: imageUrl, title: product.name, alt: product.name, data: null }];
  }
  if (product.augmentation && product.augmentation.pictures && product.augmentation.pictures.length > 0) {
    media = product.augmentation?.pictures.map((item: any) => {
      return initializePicture(item);
    });
  }

  const detailProduct: DetailProduct = {
    ...initializeProductBannerFromProduct(product as ProductImpl, rootSegment),
    id: product.shortId,
    name: product.name,
    shortDescription: product.shortDescription,
    longDescription: product.longDescription,
    shopNowConfiguration: true,
    pictures: media,
  };
  const placements = product?.augmentation?.pdpPagegrid?.placements as Placements;

  return (
    <ProductPageContext media={media} product={detailProduct}>
      <SeoHeader title={detailProduct.name} />
      <RootPreviewId metadataRoot={detailProduct.metadata?.root} />
      <DetailedProduct placements={placements} />
    </ProductPageContext>
  );
};

export default ProductPage;
