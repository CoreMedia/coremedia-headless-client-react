import React, { FC } from "react";
import { match } from "react-router-dom";
import { NetworkStatus } from "@apollo/client";
import {
  Category,
  CategoryByIdWithCampaignsQuery,
  Slot,
  SlotResult,
  useCategoryByIdQuery,
  useCategoryByIdWithCampaignsQuery,
} from "@coremedia-labs/graphql-layer";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, CategoryNotFoundAlert } from "../components/Error/Alert";
import { Placements } from "../models/Grid/Grid";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import { useSiteContextState } from "../context/SiteContextProvider";
import SearchPageContext, { Facet, FacetValues } from "../context/SearchPageContext";
import { useSearchStateContextState } from "../context/SearchStateContext";
import { initializeBannerFor } from "../models/Banner/Banner";
import { notEmpty } from "../utils/Helpers";
import DetailedCategory from "../components/Category/DetailedCategory";
import SeoHeader from "../components/Header/SeoHeader";
import { initializeMetadata } from "../utils/Preview/MetaData";
import CategoryPageContext from "../context/CategoryPageContext";
import {
  CAMPAIGN_CONTEXT_CATEGORY,
  getRefinementData,
  hasCampaignData,
  isCampaignEnabled,
} from "../utils/Campaign/CampaignUtil";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  seoSegment: string;
}

export const ITEMS_PER_PAGE = 12;

const CategoryPage: FC<PageProps> = ({ match }) => {
  const { siteId, currentNavigation, rootSegment } = useSiteContextState();
  const { selectedFacets } = useSearchStateContextState();
  let campaignDataSlots: Array<Slot> | undefined;

  // Fetch page data with or without campaigns
  const queryVars = {
    variables: {
      externalId: match.params.seoSegment,
      siteId: siteId,
      searchTerm: "*",
      offset: 0,
      limit: ITEMS_PER_PAGE,
      filterFacets: selectedFacets.map((item) => {
        return item.facetQuery;
      }),
      refinements: getRefinementData(currentNavigation, CAMPAIGN_CONTEXT_CATEGORY),
    },
  };

  const { data, loading, error, fetchMore, networkStatus } = isCampaignEnabled()
    ? useCategoryByIdWithCampaignsQuery(queryVars)
    : useCategoryByIdQuery(queryVars);

  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  if (loading && !loadingMore) {
    return <Loading />;
  }
  if (error) {
    return <ApolloClientAlert error={error} />;
  }
  if (!data || !data.category || !data.searchProducts) {
    return <CategoryNotFoundAlert />;
  }

  const onLoadMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    const currentLength =
      (data && data.searchProducts && data.searchProducts.items && data.searchProducts.items.length) || 0;
    fetchMore({
      variables: {
        offset: currentLength,
      },
    });
  };
  const { category, searchProducts } = data;

  const availableFacets: Array<Facet> | undefined = searchProducts.resultFacets?.filter(notEmpty).map((value) => {
    const result: Facet = {
      ...value,
      multiSelect: value.multiSelect || undefined,
      values:
        value.values?.filter(notEmpty).map((facetValue) => {
          const resultFacetValue: FacetValues = {
            ...facetValue,
            hitCount: facetValue.hitCount || undefined,
            selected: facetValue.selected || undefined,
          };
          return resultFacetValue;
        }) || [],
    };
    return result;
  });
  const placements = category?.augmentation?.grid?.placements as Placements;

  if (isCampaignEnabled()) {
    const campaignData = (data as CategoryByIdWithCampaignsQuery)?.campaignContent as SlotResult;
    if (hasCampaignData(campaignData)) {
      console.debug("Campaign data loaded: ", campaignData);
      campaignDataSlots = campaignData.slots as Array<Slot>;
    }
  }

  return (
    <SearchPageContext
      totalCount={searchProducts.totalCount}
      availableFacets={availableFacets}
      result={
        searchProducts.items &&
        searchProducts.items
          .filter(notEmpty)
          .map((product) => initializeBannerFor(product, rootSegment))
          .filter(notEmpty)
      }
      query={category.name || undefined}
      onLoadMore={onLoadMore}
      isLoading={loadingMore}
    >
      <CategoryPageContext
        categoryName={category.name}
        categoryChildren={category.children?.filter(notEmpty) as Array<Category>}
      >
        <SeoHeader title={category.name} />
        <RootPreviewId
          metadataRoot={
            initializeMetadata(category.augmentation?.content?.id || category.id, "commerce").metadata?.root
          }
        />
        <DetailedCategory placements={placements} name={category.name} campaignDataSlots={campaignDataSlots} />
      </CategoryPageContext>
    </SearchPageContext>
  );
};

export default CategoryPage;
