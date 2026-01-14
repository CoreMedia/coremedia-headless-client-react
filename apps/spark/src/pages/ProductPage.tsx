import React, { FC } from "react";
import { match } from "react-router-dom";
import { ProductImpl, useProductByIdQuery } from "@coremedia-labs/graphql-layer";
import { Helmet } from "react-helmet-async";
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
import { Download } from "../models/Detail/Download";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const ProductPage: FC<PageProps> = ({ match }) => {
  const { siteId, rootSegment, cmecConfig } = useSiteContextState();

  const variables: any = {
    externalId: match.params.seoSegment,
    siteId: siteId,
  };

  const { data, loading, error } = useProductByIdQuery({ variables: variables });

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

  let downloads: Array<Download> = [];
  if (product.augmentation && product.augmentation.downloads && product.augmentation.downloads.length > 0) {
    downloads = product.augmentation?.downloads.map((item: any) => {
      return item;
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
    downloads: downloads,
  };
  const placements = product?.augmentation?.pdpPagegrid?.placements as Placements;

  // cmec extra metrics
  let cmecPageData = "";
  if (product.augmentation?.content) {
    cmecPageData = `var bysideWebcare_content_uuid="${product.augmentation.content.uuid}";`;
    cmecPageData += `var bysideWebcare_content_type="${product.augmentation.content.type}";`;
    cmecPageData += `var bysideWebcare_content_locale="${product.augmentation.content.locale}";`;
  } else {
    cmecPageData = `var bysideWebcare_content_unavailable = new Date().getTime();`;
  }

  return (
    <ProductPageContext media={media} downloads={downloads} product={detailProduct}>
      {!!cmecConfig && (
        <Helmet>
          <script>{cmecPageData}</script>
        </Helmet>
      )}
      <SeoHeader title={detailProduct.name} />
      <RootPreviewId metadataRoot={detailProduct.metadata?.root} />
      <DetailedProduct placements={placements} />
    </ProductPageContext>
  );
};

export default ProductPage;
