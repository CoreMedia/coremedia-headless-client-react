import React from "react";
import styled from "styled-components";
import { Slot } from "@coremedia-labs/graphql-layer";
import Col, { StyledCol } from "../PageGrid/Col";
import { placementByName } from "../../utils/PageGrid/PageGridUtil";
import { StyledDetail } from "../Details/Detail";
import { Col as ColPlacement, Placements } from "../../models/Grid/Grid";
import { DetailProduct } from "../../models/Detail/DetailProduct";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getFirstContentForCampaignSlot } from "../../utils/Campaign/CampaignUtil";
import CampaignSlot from "../Campaign/CampaignSlot";
import HeroBanner from "../HeroBanner/HeroBanner";
import LeftRightBanner from "../LeftRightBanner/LeftRightBanner";
import ProductDetails from "./ProductDetails";
import ProductAssets from "./ProductAssets";

const StyledDetailProduct = styled(StyledDetail)`
  display: flex;
`;

interface Props {
  product?: DetailProduct;
  placements: Placements;
  campaignDataSlots?: Array<Slot>;
}

const DetailedProduct: React.FC<Props> = ({ placements, campaignDataSlots }) => {
  const { rootSegment } = useSiteContextState();

  const campaignBannerHero = getFirstContentForCampaignSlot("banner", rootSegment, campaignDataSlots);
  const campaignBannerTab = getFirstContentForCampaignSlot("tab", rootSegment, campaignDataSlots);
  const campaignBannerAdditional = getFirstContentForCampaignSlot("additional", rootSegment, campaignDataSlots);

  return (
    <>
      <Col col={placementByName(placements, "banner") as ColPlacement} />
      <StyledCol zone={"main"}>
        <CampaignSlot name={"Banner"} campaignDataSlots={campaignDataSlots}>
          {campaignBannerHero && <HeroBanner banner={campaignBannerHero} />}
        </CampaignSlot>
        <StyledDetailProduct>
          <ProductAssets />
          <ProductDetails />
        </StyledDetailProduct>
      </StyledCol>
      {/* Tab*/}
      <CampaignSlot name={"Tab"} campaignDataSlots={campaignDataSlots}>
        {campaignBannerTab && <LeftRightBanner {...campaignBannerTab} />}
      </CampaignSlot>
      <Col col={placementByName(placements, "tab") as ColPlacement} />

      <CampaignSlot name={"Additional"} campaignDataSlots={campaignDataSlots}>
        {campaignBannerAdditional && <LeftRightBanner {...campaignBannerAdditional} />}
      </CampaignSlot>
      <Col col={placementByName(placements, "additional") as ColPlacement} />
    </>
  );
};
export default DetailedProduct;
