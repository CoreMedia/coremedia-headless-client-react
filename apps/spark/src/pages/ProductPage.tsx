import React, { FC } from "react";
import { match } from "react-router-dom";
import {
  ProductByIdWithCampaignsQuery,
  ProductImpl,
  Slot,
  SlotResult,
  useProductByIdQuery,
  useProductByIdWithCampaignsQuery,
} from "@coremedia-labs/graphql-layer";
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
import {
  CAMPAIGN_CONTEXT_PRODUCT,
  getRefinementData,
  hasCampaignData,
  isCampaignEnabled,
} from "../utils/Campaign/CampaignUtil";
import { Download } from "../models/Detail/DetailCMProduct";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const ProductPage: FC<PageProps> = ({ match }) => {
  const { siteId, currentNavigation, rootSegment } = useSiteContextState();
  let campaignDataSlots: Array<Slot> | undefined;

  // Fetch page data with or without campaigns
  const queryVars = {
    variables: {
      externalId: match.params.seoSegment,
      siteId: siteId,
      refinements: getRefinementData(currentNavigation, CAMPAIGN_CONTEXT_PRODUCT),
    },
  };

  const { data, loading, error } = isCampaignEnabled()
    ? useProductByIdWithCampaignsQuery(queryVars)
    : useProductByIdQuery(queryVars);

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

  if (isCampaignEnabled()) {
    const campaignData = (data as ProductByIdWithCampaignsQuery)?.campaignContent as SlotResult;
    if (hasCampaignData(campaignData)) {
      console.debug("Campaign data loaded: ", campaignData);
      campaignDataSlots = campaignData.slots as Array<Slot>;
    }
  }

  return (
    <ProductPageContext media={media} downloads={downloads} product={detailProduct}>
      <SeoHeader title={detailProduct.name} />
      <RootPreviewId metadataRoot={detailProduct.metadata?.root} />
      <DetailedProduct placements={placements} campaignDataSlots={campaignDataSlots} />
    </ProductPageContext>
  );
};

export default ProductPage;
