import React, { FC } from "react";
import { match } from "react-router-dom";
import {
  PageByPathWithCampaignsQuery,
  PageGrid as PageGridGraphQl,
  Slot,
  SlotResult,
  usePageByPathQuery,
  usePageByPathWithCampaignsQuery,
} from "@coremedia-labs/graphql-layer";
import PageGrid from "../components/PageGrid/PageGrid";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeGrid } from "../models/Grid/Grid";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import { useSiteContextState } from "../context/SiteContextProvider";
import { getCurrentNavigationUuid, hasCampaignData, isCampaignEnabled } from "../utils/Campaign/CampaignUtil";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  pageId: string;
  pathSegments: string;
}

const Page: FC<PageProps> = ({ match }) => {
  const { siteId, navigation, currentNavigation } = useSiteContextState();
  const currentUuid = getCurrentNavigationUuid(navigation, currentNavigation || []) || "";
  const path = match.params.pathSegments;
  let campaignDataSlots: Array<Slot> | undefined;

  // Fetch page data with or without campaigns
  const queryVars = {
    variables: {
      path: path,
      siteId: siteId,
      refinements: [currentUuid],
    },
  };

  const { data, loading, error } = isCampaignEnabled()
    ? usePageByPathWithCampaignsQuery(queryVars)
    : usePageByPathQuery(queryVars);

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.pageByPath) return <PageNotFoundAlert />;

  if (isCampaignEnabled()) {
    const campaignData = (data as PageByPathWithCampaignsQuery)?.campaignContent as SlotResult;
    if (hasCampaignData(campaignData)) {
      console.debug("Campaign data loaded: ", campaignData);
      campaignDataSlots = campaignData.slots as Array<Slot>;
    }
  }

  return (
    <>
      <SeoHeader title={data?.content?.pageByPath?.title} />
      {data?.content?.pageByPath?.id && <RootPreviewId metadataRoot={{ id: data?.content?.pageByPath?.id }} />}
      {data.content.pageByPath.grid && (
        <PageGrid
          {...initializeGrid(data.content.pageByPath.grid as PageGridGraphQl)}
          campaignDataSlots={campaignDataSlots}
        />
      )}
    </>
  );
};

export default Page;
