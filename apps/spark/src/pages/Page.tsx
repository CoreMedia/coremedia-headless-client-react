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
import log from "loglevel";
import PageGrid from "../components/PageGrid/PageGrid";
import Loading from "../components/Loading/Loading";
import { ApolloClientAlert, PageNotFoundAlert } from "../components/Error/Alert";
import { initializeGrid } from "../models/Grid/Grid";
import SeoHeader from "../components/Header/SeoHeader";
import RootPreviewId from "../components/FragmentPreview/RootPreviewId";
import { useSiteContextState } from "../context/SiteContextProvider";
import {
  getCurrentNavigationUuid,
  hasCampaignData,
  isCampaignEnabled,
  addCampaignQueryVariables,
} from "../utils/Campaign/CampaignUtil";
import { usePreviewContextState } from "../context/PreviewContextProvider";

interface PageProps {
  match: match<RouteProps>;
}

interface RouteProps {
  pageId: string;
  pathSegments: string;
}
const Page: FC<PageProps> = ({ match }) => {
  const { siteId, navigation, currentNavigation } = useSiteContextState();
  const { previewCampaignId, previewDate } = usePreviewContextState();
  const currentUuid = getCurrentNavigationUuid(navigation, currentNavigation || []) || "";
  const path = match.params.pathSegments;

  let variables: any = {
    path: path,
    siteId: siteId,
  };

  const campaignEnabled = isCampaignEnabled();
  let campaignDataSlots: Array<Slot> | undefined;
  variables = addCampaignQueryVariables(variables, currentUuid, undefined, previewCampaignId, previewDate);

  const { data, loading, error } = campaignEnabled
    ? usePageByPathWithCampaignsQuery({ variables: variables })
    : usePageByPathQuery({ variables: variables });

  if (loading) return <Loading />;
  if (error) return <ApolloClientAlert error={error} />;
  if (!data || !data.content || !data.content.pageByPath) return <PageNotFoundAlert />;

  if (campaignEnabled) {
    let campaignData;
    if (variables.modePreviewCampaign) {
      campaignData = (data as PageByPathWithCampaignsQuery)?.previewCampaign as SlotResult;
    } else if (variables.modePreviewCampaignContent) {
      campaignData = (data as PageByPathWithCampaignsQuery)?.previewCampaignContent as SlotResult;
    } else {
      campaignData = (data as PageByPathWithCampaignsQuery)?.campaignContent as SlotResult;
    }

    if (hasCampaignData(campaignData)) {
      log.debug("Campaign data loaded for cms page: ", campaignData);
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
