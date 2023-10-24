import React from "react";
import styled from "styled-components";
import { Slot } from "@coremedia-labs/graphql-layer";
import { placementByName } from "../../utils/PageGrid/PageGridUtil";
import Col from "../PageGrid/Col";
import { StyledDetail } from "../Details/Detail";
import { Col as ColPlacement, Placements } from "../../models/Grid/Grid";
import FacetFilters from "../Search/Filters/FacetFilters";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { getFirstContentForCampaignSlot } from "../../utils/Campaign/CampaignUtil";
import HeroBanner from "../HeroBanner/HeroBanner";
import SquareBanner from "../SquareBanner/SquareBanner";
import CampaignSlot from "../Campaign/CampaignSlot";
import CategoryHeader from "./CategoryHeader";
import SubCategoryList from "./SubCategoryList";
import ProductList from "./ProductList";

const StyledRow = styled.div`
  display: flex;
  width: 100%;
`;

const Sidebar = styled.div`
  flex: 1 0 auto;
  padding-right: var(--padding-medium);
  max-width: 25%;

  > div {
    float: none;
    width: auto;
  }
`;
const Content = styled.div`
  flex: 3 0 auto;
  max-width: 75%;

  > div {
    max-width: 100%;
  }
`;

interface Props {
  name?: string | null;
  placements: Placements;
  campaignDataSlots?: Array<Slot>;
}

const DetailedCategory: React.FC<Props> = ({ name, placements, campaignDataSlots }) => {
  const { rootSegment } = useSiteContextState();

  const campaignBannerHero = getFirstContentForCampaignSlot("hero", rootSegment, campaignDataSlots);
  const campaignBannerMain = getFirstContentForCampaignSlot("main", rootSegment, campaignDataSlots);
  const campaignBannerSidebar = getFirstContentForCampaignSlot("sidebar", rootSegment, campaignDataSlots);

  return (
    <StyledDetail>
      <CategoryHeader>{name}</CategoryHeader>
      {campaignBannerHero && (
        <CampaignSlot name={"Hero"} campaignDataSlots={campaignDataSlots}>
          <HeroBanner banner={campaignBannerHero} />
        </CampaignSlot>
      )}
      <StyledRow>
        <Sidebar>
          <SubCategoryList />
          <FacetFilters />
          <Col col={placementByName(placements, "sidebar") as ColPlacement} />
          {campaignBannerSidebar && (
            <CampaignSlot name={"Sidebar"} campaignDataSlots={campaignDataSlots}>
              <SquareBanner {...campaignBannerSidebar} />
            </CampaignSlot>
          )}
        </Sidebar>
        <Content>
          {campaignBannerMain && (
            <CampaignSlot name={"Main"} campaignDataSlots={campaignDataSlots}>
              <HeroBanner banner={campaignBannerMain} />
            </CampaignSlot>
          )}
          <ProductList />
          <Col col={placementByName(placements, "main") as ColPlacement} />
        </Content>
      </StyledRow>
    </StyledDetail>
  );
};
export default DetailedCategory;
