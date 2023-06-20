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
import log from "loglevel";
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
  hasCampaignData,
  isCampaignEnabled,
  addCampaignQueryVariables,
} from "../utils/Campaign/CampaignUtil";
import { usePreviewContextState } from "../context/PreviewContextProvider";
import { Download } from "../models/Detail/Download";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  catalogPath: string;
  seoSegment: string;
}

const ProductPage: FC<PageProps> = ({ match }) => {
  const { siteId, currentNavigation, rootSegment } = useSiteContextState();
  const { previewCampaignId, previewDate } = usePreviewContextState();

  let variables: any = {
    externalId: match.params.seoSegment,
    siteId: siteId,
  };

  const campaignEnabled = isCampaignEnabled();
  let campaignDataSlots: Array<Slot> | undefined;
  variables = addCampaignQueryVariables(
    variables,
    CAMPAIGN_CONTEXT_PRODUCT,
    currentNavigation,
    previewCampaignId,
    previewDate
  );

  const { data, loading, error } = campaignEnabled
    ? useProductByIdWithCampaignsQuery({ variables: variables })
    : useProductByIdQuery({ variables: variables });

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

  if (campaignEnabled) {
    let campaignData;
    if (variables.modePreviewCampaign) {
      campaignData = (data as ProductByIdWithCampaignsQuery)?.previewCampaign as SlotResult;
    } else if (variables.modePreviewCampaignContent) {
      campaignData = (data as ProductByIdWithCampaignsQuery)?.previewCampaignContent as SlotResult;
    } else {
      campaignData = (data as ProductByIdWithCampaignsQuery)?.campaignContent as SlotResult;
    }

    if (hasCampaignData(campaignData)) {
      log.debug("Campaign data loaded for product page: ", campaignData);
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
