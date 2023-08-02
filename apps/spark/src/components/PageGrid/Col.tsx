import React, { FC } from "react";
import styled, { css } from "styled-components";
import { Slot as campaignSlot } from "@coremedia-labs/graphql-layer";
import { useSiteContextState } from "../../context/SiteContextProvider";
import { initializeBannerFor } from "../../models/Banner/Banner";
import { Col as ColProps } from "../../models/Grid/Grid";
import { initializeSlot, Slot } from "../../models/Grid/Slot";
import { slotByName } from "../../utils/PageGrid/PageGridUtil";
import { flattenItems, notEmpty } from "../../utils/Helpers";
import { metaDataForPlacement } from "../../utils/Preview/MetaData";
import { initializeDetail } from "../../models/Detail/Detail";
import DetailContainer from "../Details/DetailContainer";
import { getFirstContentForCampaignSlot } from "../../utils/Campaign/CampaignUtil";
import CampaignSlot from "../Campaign/CampaignSlot";
import HeroBanner from "../HeroBanner/HeroBanner";
import LeftRightBanner from "../LeftRightBanner/LeftRightBanner";

interface PageGridPlacementProps {
  col?: ColProps;
  campaignDataSlots?: Array<campaignSlot>;
}

export const StyledCol = styled.div<{ zone?: string }>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  flex-shrink: 0;

  // add gap to grid
  width: calc(100% - var(--grid-gap) * 2);
  margin-top: var(--grid-gap);

  > div:not(:first-child) {
    margin-top: var(--grid-gap);
  }

  @media screen and (min-width: 1200px) {
    width: var(--screen-size-max);
    max-width: 100%;
  }

  // no gap for first element on big screens
  @media screen and (min-width: 768px) and (orientation: landscape), (min-width: 1200px) {
    &:first-of-type {
      margin-top: 0;
    }
  }

  ${(props) => {
    return (
      props.zone &&
      props.zone === "main" &&
      css`
        flex-grow: 1;
      `
    );
  }};
  ${(props) =>
    props.zone &&
    props.zone === "placement3" &&
    css`
      flex-grow: 1;
    `};
  ${(props) =>
    props.zone &&
    props.zone === "footer-navigation" &&
    css`
      width: 100%;
      @media screen and (min-width: 1200px) {
        width: 100%;
      }
      margin-top: var(--padding-large);
    `};
  ${(props) =>
    props.zone &&
    props.zone === "footer" &&
    css`
      width: 100%;
      @media screen and (min-width: 1200px) {
        width: 100%;
      }
      margin-top: 0;
    `};
`;

const Col: FC<PageGridPlacementProps> = ({ col, campaignDataSlots }) => {
  const { rootSegment } = useSiteContextState();
  const campaignBanner = getFirstContentForCampaignSlot(col?.name || "", rootSegment, campaignDataSlots);
  let flattenedContainer;

  // Empty Placement
  if (!col || !col.items || col.items.length === 0) {
    return null;
  }

  //Flatten items if a viewtype has been set, and it is full-details
  if (col.viewtype && col.viewtype === "full-details") {
    const items = flattenItems(col.items)
      .map((banner) => initializeDetail(banner, rootSegment))
      .filter(notEmpty);

    flattenedContainer = <DetailContainer {...col} items={items} />;
  }
  //Flatten items if a viewtype has been set, and it is not default
  else if (col.viewtype && col.viewtype !== "default") {
    const Container = slotByName(col.viewtype);
    const items = flattenItems(col.items)
      .map((banner) => initializeBannerFor(banner, rootSegment))
      .filter(notEmpty);

    flattenedContainer = <Container {...col} items={items} />;
  }
  return (
    <>
      {campaignBanner && (
        <CampaignSlot name={col.name} campaignDataSlots={campaignDataSlots}>
          {col.name === "hero" && <HeroBanner banner={campaignBanner} />}
          {col.name !== "hero" && <LeftRightBanner {...campaignBanner} />}
        </CampaignSlot>
      )}
      <StyledCol zone={col.name} {...metaDataForPlacement(col.name, !!col.items)}>
        {flattenedContainer}
        {!flattenedContainer &&
          col.items.filter(notEmpty).map((item, index) => {
            let slot: Slot;
            const Container = slotByName(item.viewtype);
            //Either we are a collection of items
            if ("items" in item) {
              slot = initializeSlot(item, rootSegment);
            } else {
              //or not
              slot = initializeSlot({ items: [item] }, rootSegment);
            }
            return <Container {...slot} key={index} />;
          })}
      </StyledCol>
    </>
  );
};

export default Col;
