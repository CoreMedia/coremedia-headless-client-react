import React from "react";
import { Slot } from "@coremedia-labs/graphql-layer";
import { metaDataForCampaignSlot } from "../../utils/Preview/MetaData";
import { getFirstContentForCampaignSlot, hasCampaignDataSlotItems } from "../../utils/Campaign/CampaignUtil";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { StyledCol } from "../PageGrid/Col";

interface CampaignSlotProps {
  name: string;
  campaignDataSlots?: Array<Slot>;
}

const CampaignSlot: React.FC<CampaignSlotProps> = ({ name, campaignDataSlots, children }) => {
  const { rootSegment } = useSiteContextState();

  const hasContent =
    hasCampaignDataSlotItems(campaignDataSlots) &&
    getFirstContentForCampaignSlot(name.toLowerCase(), rootSegment, campaignDataSlots) !== undefined;

  return <StyledCol {...metaDataForCampaignSlot(name, hasContent)}>{hasContent && children}</StyledCol>;
};

export default CampaignSlot;
